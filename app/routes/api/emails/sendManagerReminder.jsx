/* eslint-disable import/prefer-default-export */
// API routing doesn't work if we export this as default.

import { sendManagerReminder } from 'app/controllers/emails/sendManagerReminder';
import { sendEmployesReminder } from 'app/controllers/emails/sendEmployeesReminder';
import { json } from '@remix-run/node';
import { sendManagersEmailReminder, sendEmployeesEmailReminder } from 'app/config/flags.json';
import validateKey from 'app/utils/backend/api/validateKey';

export const loader = () => {
  throw new Response(null, { status: 404, statusText: 'Not Found' });
};

export const action = async ({ request }) => {
  const { error: keyValidationError } = validateKey(request);

  if (keyValidationError) {
    return json({ success: false, detail: keyValidationError }, 400);
  }

  if (sendManagersEmailReminder) {
    const { error, emailsQueue } = await sendManagerReminder();
    if (error) {
      return json({ success: false, detail: error }, 500);
    }
    return json({ success: true, emailsQueue: emailsQueue.length }, 200);
  }

  if (sendEmployeesEmailReminder) {
    const { error, emailsQueue } = await sendEmployesReminder();
    if (error) {
      return json({ success: false, detail: error }, 500);
    }
    return json({ success: true, emailsQueue: emailsQueue.length }, 200);
  }

  return json({ detail: 'This feature is currently disabled.' }, 200);
};
