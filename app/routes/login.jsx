import React from 'react';
import { json, redirect } from '@remix-run/node';
import LoginContainer from 'app/components/Login/LoginContainer';
import { getAuthenticatedUser } from 'app/session.server';

export const loader = async ({ request }) => {
  const authenticated = await getAuthenticatedUser(request);

  if (authenticated) {
    return redirect('/');
  }

  return json({});
};

function Login() {
  return <LoginContainer />;
}

export default Login;
