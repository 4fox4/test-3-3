import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

import { CountersCollection } from "/imports/api/counters/counters";
import { getUserFullName, getUserInitials } from "/imports/api/users/users";

export interface CounterWithUser {
  _id?: string;
  userId: string;
  value: number;
  updatedAt: Date;
  user?: Meteor.User | null;
  userFullName: string;
  userInitials: string;
}

export const useMyCounter = () => {
  return useTracker(() => {
    if (!Meteor.userId()) {
      return { counter: null, isLoading: false };
    }

    const subscription = Meteor.subscribe("myCounter");
    const isLoading = !subscription.ready();

    const counter = CountersCollection.findOne({ userId: Meteor.userId()! });

    return {
      counter,
      isLoading,
    };
  }, []);
};

export const useTopCounters = () => {
  return useTracker(() => {
    const subscription = Meteor.subscribe("topCounters");
    const usersSubscription = Meteor.subscribe("usersInfo");
    const isLoading = !subscription.ready() || !usersSubscription.ready();

    const counters = CountersCollection.find(
      {},
      {
        sort: { value: -1 },
        limit: 3,
      }
    ).fetch();

    const countersWithUsers: CounterWithUser[] = counters.map((counter) => {
      const user = Meteor.users.findOne(counter.userId);
      return {
        ...counter,
        user: user || null,
        userFullName: getUserFullName(user || null),
        userInitials: getUserInitials(user || null),
      };
    });

    return {
      topCounters: countersWithUsers,
      isLoading,
    };
  }, []);
};

export const useAllCounters = () => {
  return useTracker(() => {
    const subscription = Meteor.subscribe("allCounters");
    const usersSubscription = Meteor.subscribe("usersInfo");
    const isLoading = !subscription.ready() || !usersSubscription.ready();

    const counters = CountersCollection.find(
      {},
      {
        sort: { value: -1 },
      }
    ).fetch();

    const countersWithUsers: CounterWithUser[] = counters.map((counter) => {
      const user = Meteor.users.findOne(counter.userId);
      return {
        ...counter,
        user: user || null,
        userFullName: getUserFullName(user || null),
        userInitials: getUserInitials(user || null),
      };
    });

    const totalCount = countersWithUsers.reduce(
      (sum, counter) => sum + counter.value,
      0
    );

    return {
      allCounters: countersWithUsers,
      totalCount,
      isLoading,
    };
  }, []);
};

export const useCounterActions = () => {
  const incrementCounter = async (counterId: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      Meteor.call(
        "counters.increment",
        counterId,
        (error: any, result: number) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  };

  const decrementCounter = async (counterId: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      Meteor.call(
        "counters.decrement",
        counterId,
        (error: any, result: number) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  };

  const resetCounter = async (counterId: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      Meteor.call("counters.reset", counterId, (error: any, result: number) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

  return {
    incrementCounter,
    decrementCounter,
    resetCounter,
  };
};
