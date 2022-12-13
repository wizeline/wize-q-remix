import React from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import toastify from 'react-toastify/dist/ReactToastify.css';
import reactDraftWysiwyg from 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftJs from 'draft-js/dist/Draft.css';
import { json } from '@remix-run/node';
import globalStyle from 'app/styles/global.css';
import bootstrap from 'app/styles/bootstrap/css/bootstrap.min.css';

import ErrorHandler from 'app/components/ErrorHandler/ErrorHandler';

import { commitSession, getAuthenticatedUser, getSession } from 'app/session.server';
import AppNavbar from 'app/components/AppNavbar';
import listQuestions from 'app/controllers/questions/list';

const titleSuffix = process.env.NODE_ENV === 'development' ? ' - Local' : '';

export const meta = () => ({
  charset: 'utf-8',
  title: `Wizeline Questions${titleSuffix}`,
  viewport: 'width=device-width,initial-scale=1',
});

export function links() {
  return [
    { rel: 'stylesheet', href: bootstrap },
    { rel: 'stylesheet', href: toastify },
    { rel: 'stylesheet', href: draftJs },
    { rel: 'stylesheet', href: reactDraftWysiwyg },
    { rel: 'stylesheet', href: globalStyle },
  ];
}

export const loader = async ({ request }) => {
  const profile = await getAuthenticatedUser(request);
  const session = await getSession(request);
  const url = new URL(request.url);
  const search = url.searchParams.get('search');

  let searchResults = [];

  if (search) {
    searchResults = await listQuestions({
      user: profile,
      limit: 5,
      search,
    });
  }

  const globalSuccess = session.get('globalSuccess') || null;

  return json(
    {
      profile,
      globalSuccess,
      searchResults,
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  );
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
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

// eslint-disable-next-line react/prop-types
export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <html lang="es">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorHandler error={error} />
        <Scripts />
      </body>
    </html>
  );
}
