import {sign} from 'jsonwebtoken';
import {clientSecret} from 'server/utils/auth0Helpers';
import {JWT_LIFESPAN} from 'server/utils/serverConstants';

export const mintTokenUnsigned = (userId, fields) => {
  const now = Date.now();
  const exp = ~~((now + JWT_LIFESPAN) / 1000); // eslint-disable-line no-bitwise
  const iat = ~~(now / 1000); // eslint-disable-line no-bitwise

  const newToken = {
    iss: 'ava-unit-test',
    sub: userId,
    aud: process.env.AUTH0_CLIENT_ID,
    exp,
    iat,
    ...fields
  };

  return newToken;
};

export const mintTokenSigned = (userId, fields) => {
  const secret = new Buffer(clientSecret, 'base64');
  return sign(mintTokenUnsigned(userId, fields), secret);
};

export default mintTokenUnsigned;
