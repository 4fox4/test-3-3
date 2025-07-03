import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { CountersCollection } from "../counters/counters";

// Extension de l'interface User de Meteor
declare module "meteor/meteor" {
  namespace Meteor {
    interface UserProfile {
      firstName: string;
      lastName: string;
    }

    interface User {
      profile?: UserProfile;
    }
  }
}

// Configuration de la création d'utilisateur
if (Meteor.isServer) {
  // Personnalisation de la création d'utilisateur
  Accounts.onCreateUser((options: any, user: Meteor.User) => {
    // Créer le profil utilisateur avec les données fournies
    user.profile = {
      firstName: options.profile?.firstName || options.firstName || "",
      lastName: options.profile?.lastName || options.lastName || "",
    };

    return user;
  });

  // Hook après création d'utilisateur pour créer le compteur
  Accounts.onLogin(async (info: any) => {
    if (info.type === "password" && info.user) {
      // Vérifier si l'utilisateur a déjà un compteur
      const existingCounter = await CountersCollection.findOneAsync({
        userId: info.user._id,
      });
      if (!existingCounter) {
        await CountersCollection.insertAsync({
          userId: info.user._id,
          value: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
  });
}

// Fonctions utilitaires pour les utilisateurs
export const getUserFullName = (user: Meteor.User | null): string => {
  if (!user || !user.profile) return "Utilisateur";
  return (
    `${user.profile.firstName} ${user.profile.lastName}`.trim() || "Utilisateur"
  );
};

export const getUserInitials = (user: Meteor.User | null): string => {
  if (!user || !user.profile) return "U";
  const firstName = user.profile.firstName || "";
  const lastName = user.profile.lastName || "";
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "U";
};

export const getUserEmail = (user: Meteor.User | null): string => {
  if (!user || !user.emails || user.emails.length === 0) return "";
  return user.emails[0].address || "";
};
