/* eslint-disable import/prefer-default-export */
// API routing doesn't work if we export this as default.

import { sendManagerReminder } from 'app/controllers/emails/sendManagerReminder';
import { json } from '@remix-run/node';
import { sendManagersEmailReminder } from 'app/config/flags.json';

export const loader = async () => {
  // INSERT KEY VALIDATION

  if (sendManagersEmailReminder) {
    const { error, emailsQueue } = await sendManagerReminder();
    if (error) {
      return json({ success: false, detail: error }, 500);
    }
    return json({ success: true, emailsQueue: emailsQueue.length }, 200);
  }

  return json({ detail: 'This feature is currently disabled.' }, 200);
};
