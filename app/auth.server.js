import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { sessionStorage } from "~/session.server";
import { findOrCreateUser } from "~/controllers/users/find";

const callbackURL = `${process.env.BASE_URL}/auth/auth0/callback`;
const clientID = process.env.AUTH0_CLIENT_ID || "AUTH0_CLIENT_ID must be set";
const clientSecret = process.env.AUTH0_CLIENT_SECRET || "AUTH0_CLIENT_SECRET must be set";
const domain = process.env.AUTH0_DOMAIN || "AUTH0_DOMAIN must be set";

export const authenticator = new Authenticator(sessionStorage);

const strategyConfig =  {
  callbackURL,
  clientID,
  clientSecret,
  domain,
};

let auth0Strategy = new Auth0Strategy(strategyConfig,
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    try {

      const fullName = `${profile.name.givenName} ${profile.name.familyName}`;
      const email = profile.emails.length > 0 ? profile.emails[0].value : undefined;
      const profilePic = profile.photos.length > 0 ? profile.photos[0].value : undefined;

      const user = await findOrCreateUser({
        full_name: fullName,
        email: email,
        profile_picture: profilePic,
      });

      return {
        ...user,
        accessToken,
        id: profile.id,
      };
    } catch (e) {
      console.error(e);
    }
  }
);

authenticator.use(auth0Strategy);
