import crypto from 'crypto';

const randomAccessToken = () => crypto.randomBytes(64).toString('hex');

export default randomAccessToken;
