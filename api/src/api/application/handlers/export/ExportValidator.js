import Joi from 'joi';
import Validator from '../../../../core/utils/Validator.js';

class ExportValidator extends Validator {
  constructor() {
    super(Joi.object({
      targetEmail: Joi.string().email({tlds: true}).required(),
    }));
  }
}

export default ExportValidator;
