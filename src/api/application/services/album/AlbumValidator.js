import Joi from "joi";
import ClientError from "../../../../core/exceptions/ClientError";

class AlbumValidator {
  constructor() {
    this.scheme = Joi.object({
      name: Joi.string().required(),
      year: Joi.number().required(),
    });
  }

  validate(payload) {
    const result = this.scheme.validate(payload);

    if (result.error) {
      throw new ClientError(result.error.message);
    }
  }
}

export default AlbumValidator;
