import crypto from 'crypto';

export const randomAccessToken = () => crypto.randomBytes(64).toString('hex');
