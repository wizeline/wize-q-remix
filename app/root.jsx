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
import AppNavbar from "~/components/AppNavbar";

export const meta = () => ({
  charset: "utf-8",
  title: "Wizeline Questions",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: globalStyle },
    { rel: "stylesheet", href: bootstrap },
  ];
}

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

