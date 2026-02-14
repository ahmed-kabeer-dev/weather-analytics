import pkg from 'jsonwebtoken';
const jwt = pkg;
import jwksClient from 'jwks-rsa';
import dotenv from 'dotenv';

dotenv.config();

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  cache: true,
  rateLimit: true
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error('Error getting signing key:', err);
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

export const checkJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. No token provided.'
    });
  }

  const token = authHeader.split(' ')[1];

  const decoded = jwt.decode(token, { complete: true });
  console.log('Token audience:', decoded?.payload?.aud);
  console.log('Token issuer:', decoded?.payload?.iss);

  jwt.verify(
    token,
    getKey,
    {
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256']
    },
    (err, decodedToken) => {
      if (err) {
        console.error('JWT verification failed:', err.message);
        return res.status(401).json({
          success: false,
          message: 'Unauthorized. Invalid token.'
        });
      }
      req.user = decodedToken;
      next();
    }
  );
};