import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

import { CountersCollection } from "./counters";

Meteor.methods({
  "counters.increment": async function (counterId: string) {
    this.unblock();
    check(counterId, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "Vous devez être connecté pour incrémenter un compteur"
      );
    }

    const counter = await CountersCollection.findOneAsync(counterId);
    if (!counter) {
      throw new Meteor.Error("counter-not-found", "Compteur non trouvé");
    }

    if (counter.userId !== this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "Vous ne pouvez modifier que votre propre compteur"
      );
    }

    await CountersCollection.updateAsync(counterId, {
      $inc: { value: 1 },
      $set: { updatedAt: new Date() },
    });

    return counter.value + 1;
  },

  "counters.decrement": async function (counterId: string) {
    this.unblock();
    check(counterId, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "Vous devez être connecté pour décrémenter un compteur"
      );
    }

    const counter = await CountersCollection.findOneAsync(counterId);
    if (!counter) {
      throw new Meteor.Error("counter-not-found", "Compteur non trouvé");
    }

    if (counter.userId !== this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "Vous ne pouvez modifier que votre propre compteur"
      );
    }

    await CountersCollection.updateAsync(counterId, {
      $inc: { value: -1 },
      $set: { updatedAt: new Date() },
    });

    return counter.value - 1;
  },

  "counters.create": async function (userId: string) {
    this.unblock();
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error("not-authorized", "Vous devez être connecté");
    }

    // Vérifier qu'un compteur n'existe pas déjà pour cet utilisateur
    const existingCounter = await CountersCollection.findOneAsync({ userId });
    if (existingCounter) {
      throw new Meteor.Error(
        "counter-exists",
        "Un compteur existe déjà pour cet utilisateur"
      );
    }

    const counterId = await CountersCollection.insertAsync({
      userId,
      value: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return counterId;
  },

  "counters.reset": async function (counterId: string) {
    this.unblock();
    check(counterId, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "Vous devez être connecté pour réinitialiser un compteur"
      );
    }

    const counter = await CountersCollection.findOneAsync(counterId);
    if (!counter) {
      throw new Meteor.Error("counter-not-found", "Compteur non trouvé");
    }

    if (counter.userId !== this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "Vous ne pouvez modifier que votre propre compteur"
      );
    }

    await CountersCollection.updateAsync(counterId, {
      $set: {
        value: 0,
        updatedAt: new Date(),
      },
    });

    return 0;
  },
});
