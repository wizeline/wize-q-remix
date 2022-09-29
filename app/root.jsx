import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import globalStyle from '~/styles/global.css'
import bootstrap from '~/styles/bootstrap/css/bootstrap.min.css';
import toastify from 'react-toastify/dist/ReactToastify.css';
import reactDraftWysiwyg from "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftJs from "draft-js/dist/Draft.css";

import { commitSession, getAuthenticatedUser, getSession } from "~/session.server";
import { json } from "@remix-run/node";
import AppNavbar from "~/components/AppNavbar";

const titleSuffix = process.env.NODE_ENV === "development" ? "Local" : ""

export const meta = () => ({
  charset: "utf-8",
  title: `Wizeline Questions - ${titleSuffix}`,
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: bootstrap },
    { rel: "stylesheet", href: toastify },
    { rel: "stylesheet", href: draftJs},
    { rel: "stylesheet", href: reactDraftWysiwyg },
    { rel: "stylesheet", href: globalStyle },
  ];
}

export const loader = async ({ request }) => {
  const profile = await getAuthenticatedUser(request);
  const session = await getSession(request);
  const globalSuccess = session.get("globalSuccess") || null;
  
  return json({
    profile,
    globalSuccess
  },
  {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
          <AppNavbar />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

