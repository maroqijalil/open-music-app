import Jwt from '@hapi/jwt';
import ClientError from '../exceptions/ClientError.js';

class Token {
  static generateAccessToken(payload) {
    return Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }

  static generateRefreshToken(payload) {
    return Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY);
  }

  static verifyRefreshToken(refreshToken) {
    try {
      const artifacts = Jwt.token.decode(refreshToken);

      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);

      const {payload} = artifacts.decoded;

      return payload;
    } catch (error) {
      throw new ClientError('Refresh token tidak valid');
    }
  }
}

export default Token;
