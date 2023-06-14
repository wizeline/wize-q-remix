/* eslint-disable import/prefer-default-export */
// API routing doesn't work if we export this as default.

import { sendEmployesReminder } from 'app/controllers/emails/sendEmployeesReminder';
import { json } from '@remix-run/node';
import { sendEmployeesEmailReminder } from 'app/config/flags.json';
import validateKey from 'app/utils/backend/api/validateKey';

export const loader = () => {
  throw new Response(null, { status: 404, statusText: 'Not Found' });
};

export const action = async ({ request }) => {
  try {
    const { error: keyValidationError } = validateKey(request);

    if (keyValidationError) {
      return json({ success: false, detail: keyValidationError }, 400);
    }

    if (sendEmployeesEmailReminder) {
      const { error, emailsQueue } = await sendEmployesReminder();
      if (error) {
        return json({ success: false, detail: ` sendEmployesReminder -  ${error}` }, 500);
      }
      return json({ success: true, employeeEmails: emailsQueue.length }, 200);
    }

    return json({ detail: 'This feature is currently disabled.' }, 200);
  } catch (error) {
    return json({ success: false, detail: error }, 500);
  }
};
