import ClientError from '../exceptions/ClientError.js';

class Validator {
  constructor(schema) {
    this.schema = schema;
  }

  validate(payload) {
    const result = this.schema.validate(payload);

    if (result.error) {
      throw new ClientError(result.error.message);
    }
  }
}

export default Validator;
