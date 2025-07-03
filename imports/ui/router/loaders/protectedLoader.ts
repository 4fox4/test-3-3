import { Meteor } from "meteor/meteor";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

export function protectedLoader({ request }: LoaderFunctionArgs) {
  const user = Meteor.user();
  if (!user) {
    // If the user is not logged in, redirect to the login page
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}
