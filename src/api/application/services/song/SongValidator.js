import Joi from 'joi';
import Validator from '../../../../core/utils/Validator.js';

class SongValidator extends Validator {
  constructor() {
    super(Joi.object({
      title: Joi.string().required(),
      year: Joi.number().required(),
      genre: Joi.string().required(),
      performer: Joi.string().required(),
      duration: Joi.number(),
      albumId: Joi.string(),
    }));
  }
}

export default SongValidator;
