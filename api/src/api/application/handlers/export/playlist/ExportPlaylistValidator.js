import Joi from 'joi';
import Validator from '../../../../../core/utils/Validator.js';

class ExportPlaylistValidator extends Validator {
  constructor() {
    super(Joi.object({
      targetEmail: Joi.string().email({tlds: true}).required(),
    }));
  }
}

export default ExportPlaylistValidator;
