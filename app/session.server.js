import { createCookieSessionStorage, redirect } from "@remix-run/node";

const USER_SESSION_KEY = "userData";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function createUserSession({
  request,
  userData,
  remember,
  redirectTo,
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userData);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function requireAuth(request) {
    const session = await getSession(request);
  
    if (!session.has("userData")) {
      throw redirect("/login");
    }

    return session;
}

export async function getAuthenticatedUser(request) {
  const session = await getSession(request);
  if (!session) return null;

  if (session.has("userData")) {
    return session.get("userData");
  }

  return null;
}

export async function logout(request) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}