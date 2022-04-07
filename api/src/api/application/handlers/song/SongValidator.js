import Joi from 'joi';
import Validator from '../../../../core/utils/Validator.js';

class SongValidator extends Validator {
  constructor() {
    const currentYear = new Date().getFullYear();

    super(Joi.object({
      title: Joi.string().required(),
      year: Joi.number().min(1900).max(currentYear).required(),
      genre: Joi.string().required(),
      performer: Joi.string().required(),
      duration: Joi.number(),
      albumId: Joi.string(),
    }));
  }
}

export default SongValidator;
