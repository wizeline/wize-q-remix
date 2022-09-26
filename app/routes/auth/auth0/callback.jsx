import { createUserSession } from "~/session.server";

import { authenticator } from "~/auth.server";

export let loader = async ({ request }) => {
  const user = await authenticator.authenticate("auth0", request, {
    failureRedirect: "/login",
  });

  return createUserSession({
    request,
    userData: user,
    remember: false,
    redirectTo: "/",
  });
};