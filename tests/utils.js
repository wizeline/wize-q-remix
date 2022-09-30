import crypto from 'crypto';

export const randomAccessToken = () => {
  return crypto.randomBytes(64).toString('hex');
}
