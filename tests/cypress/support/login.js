/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import { parse } from 'cookie';
import { installGlobals } from '@remix-run/node';
import { createUserSession } from 'app/session.server';

installGlobals();

async function login() {
  const response = await createUserSession({
    request: new Request('test://test'),
    userData: {
      employee_id: 1,
      full_name: 'Patrick Shu',
      email: 'patrick.shu@wizeline.com',
      is_admin: 0,
      profile_picture: null,
      job_title: null,
      accessToken: 'test',
    },
    remember: false,
    redirectTo: '/',
  });

  const cookieValue = response.headers.get('Set-Cookie');
  if (!cookieValue) {
    throw new Error('Cookie missing from createUserSession response');
  }
  const parsedCookie = parse(cookieValue);
  // we log it like this so our cypress command can parse it out and set it as
  // the cookie value.
  // eslint-disable-next-line no-console
  console.log(
    `
<cookie>
  ${parsedCookie.__session}
</cookie>
  `.trim(),
  );
}

login(process.argv[2]);
