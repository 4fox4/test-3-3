import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export interface Counter {
  _id?: string;
  userId: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export const CountersCollection = new Mongo.Collection<Counter>("counters");

// Index pour optimiser les requêtes
if (Meteor.isServer) {
  CountersCollection.createIndexAsync({ userId: 1 }, { unique: true });
  CountersCollection.createIndexAsync({ value: -1 });
}
