import Joi from 'joi';
import Validator from '../../../../core/utils/Validator';

class AuthValidator extends Validator {
  constructor() {
    super(Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }));
  }
}

export default AuthValidator;
