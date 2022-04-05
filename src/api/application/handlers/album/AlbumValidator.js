import Joi from 'joi';
import Validator from '../../../../core/utils/Validator.js';

class AlbumValidator extends Validator {
  constructor() {
    const currentYear = new Date().getFullYear();

    super(Joi.object({
      name: Joi.string().required(),
      year: Joi.number().min(1900).max(currentYear).required(),
    }));
  }
}

export default AlbumValidator;
