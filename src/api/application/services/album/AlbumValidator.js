import Joi from 'joi';
import Validator from '../../../../core/utils/Validator.js';

class AlbumValidator extends Validator {
  constructor() {
    super(Joi.object({
      name: Joi.string().required(),
      year: Joi.number().required(),
    }));
  }
}

export default AlbumValidator;
