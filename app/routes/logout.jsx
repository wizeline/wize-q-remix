import { redirect } from '@remix-run/node';

import { logout } from 'app/session.server';

export const action = async ({ request }) => logout(request);

export const loader = async () => redirect('/logout');
