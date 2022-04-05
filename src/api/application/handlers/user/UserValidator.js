import Joi from 'joi';
import Validator from '../../../../core/utils/Validator.js';

class UserValidator extends Validator {
  constructor() {
    super(Joi.object({
      username: Joi.string().max(50).required(),
      password: Joi.string().required(),
      fullname: Joi.string().required(),
    }));
  }
}

export default UserValidator;
