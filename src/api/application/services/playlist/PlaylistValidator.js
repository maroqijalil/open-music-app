import Joi from 'joi';
import Validator from '../../../../core/utils/Validator.js';

class PlaylistValidator extends Validator {
  constructor() {
    super(Joi.object({
      name: Joi.string().required(),
    }));
  }
}

export default PlaylistValidator;
