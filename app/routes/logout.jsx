import { redirect } from "@remix-run/node";

import { logout } from "~/session.server";

export const action = async ({ request }) => {
  return logout(request);
};

export const loader = async () => {
  return redirect("/logout");
};