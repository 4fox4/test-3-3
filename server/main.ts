import { Meteor } from "meteor/meteor";

// Import des API
import "/imports/api/users/users";
import "/imports/api/counters/counters";
import "/imports/api/counters/methods";
import "/imports/api/counters/publications";

Meteor.startup(async () => {
  console.log("🚀 Serveur Meteor démarré");
});
