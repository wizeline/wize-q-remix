import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import globalStyle from '~/styles/global.css'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import toastify from 'react-toastify/dist/ReactToastify.css';

import AppNavbar from "~/components/AppNavbar";
import { getAuthenticatedUser } from "~/session.server";
import { json } from "@remix-run/node";
import { SSRProvider } from "react-bootstrap";

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
    { rel: "stylesheet", href: globalStyle },
  ];
}

export const loader = async ({ request }) => {
  const profile = await getAuthenticatedUser(request);

  return json({
    profile,
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
        <SSRProvider>
          <AppNavbar />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === 'development' && <LiveReload />}
        </SSRProvider>
      </body>
    </html>
  );
}

