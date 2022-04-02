import Joi from 'joi';
import ClientError from '../../../../core/exceptions/ClientError.js';

class AlbumValidator {
  constructor() {
    this.schema = Joi.object({
      name: Joi.string().required(),
      year: Joi.number().required(),
    });
  }

  validate(payload) {
    const result = this.schema.validate(payload);

    if (result.error) {
      throw new ClientError(result.error.message);
    }
  }
}

export default AlbumValidator;
