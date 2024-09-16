import * as jwt from 'jsonwebtoken';
import { mapEnvToConfiguration } from '@modules/env/map-env-to-configuration';

const validateToken = (token: string) => {
  const { auth } = mapEnvToConfiguration();

  return jwt.verify(token, auth.secret);
};

const generateToken = () => {
  const { auth } = mapEnvToConfiguration();

  const payload = {};

  const options = {
    expiresIn: '365d',
  };

  return jwt.sign(payload, auth.secret, options);
};

export { validateToken, generateToken };
