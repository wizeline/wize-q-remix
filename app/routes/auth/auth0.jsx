import { redirect } from '@remix-run/node';
import authenticator from 'app/auth.server';

export const loader = () => redirect('/login');

export const action = async ({ request }) => authenticator.authenticate('auth0', request);
