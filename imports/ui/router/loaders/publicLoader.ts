import { Meteor } from "meteor/meteor";
import { redirect } from "react-router-dom";

export async function publicLoader() {
  const user = Meteor.user();
  if (user) {
    return redirect("/");
  }
  return null;
}
