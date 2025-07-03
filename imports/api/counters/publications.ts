import { Meteor } from "meteor/meteor";
import { CountersCollection } from "./counters";

// Publication du compteur de l'utilisateur connecté
Meteor.publish("myCounter", function () {
  if (!this.userId) {
    return this.ready();
  }

  return CountersCollection.find({ userId: this.userId });
});

// Publication du top 3 des compteurs avec les informations utilisateur
Meteor.publish("topCounters", function () {
  return CountersCollection.find(
    {},
    {
      sort: { value: -1 },
      limit: 3,
      fields: { userId: 1, value: 1, updatedAt: 1 },
    }
  );
});

// Publication de tous les compteurs (pour la page /counters)
Meteor.publish("allCounters", function () {
  return CountersCollection.find(
    {},
    {
      sort: { value: -1 },
      fields: { userId: 1, value: 1, updatedAt: 1 },
    }
  );
});

// Publication des informations utilisateur pour afficher les noms
Meteor.publish("usersInfo", function () {
  return Meteor.users.find(
    {},
    {
      fields: {
        "profile.firstName": 1,
        "profile.lastName": 1,
        "emails.address": 1,
      },
    }
  );
});

// Publication pour la recherche d'utilisateurs (optionnelle)
Meteor.publish("searchUsers", function (searchTerm: string) {
  if (!searchTerm || searchTerm.length < 2) {
    return this.ready();
  }

  const regex = new RegExp(searchTerm, "i");

  return Meteor.users.find(
    {
      $or: [
        { "profile.firstName": regex },
        { "profile.lastName": regex },
        { "emails.address": regex },
      ],
    },
    {
      fields: {
        "profile.firstName": 1,
        "profile.lastName": 1,
        "emails.address": 1,
      },
      limit: 20,
    }
  );
});
