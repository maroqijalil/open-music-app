import Joi from "joi";
import ClientError from "../../../../core/exceptions/ClientError.js";

class SongValidator {
  constructor() {
    this.schema = Joi.object({
      title: Joi.string().required(),
      year: Joi.number().required(),
      genre: Joi.string().required(),
      performer: Joi.string().required(),
      duration: Joi.number(),
      albumId: Joi.string(),
    });
  }

  validate(payload) {
    const result = this.schema.validate(payload);

    if (result.error) {
      throw new ClientError(result.error.message);
    }
  }
}

export default SongValidator;
