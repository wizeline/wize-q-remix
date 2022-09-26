import { redirect } from "@remix-run/node";
import { authenticator } from "~/auth.server";

export let loader = () => redirect("/login");

export const action = async ({ request }) => {
  return authenticator.authenticate("auth0", request);
};