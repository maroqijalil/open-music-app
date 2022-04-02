import Joi from 'joi';
import Validator from '../../../../core/utils/Validator';

class TokenValidator extends Validator {
  constructor() {
    super(Joi.object({
      refreshToken: Joi.string().required(),
    }));
  }
}

export default TokenValidator;
