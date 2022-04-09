import Joi from 'joi';
import Validator from '../../../../../core/utils/Validator.js';

class UploadAlbumValidator extends Validator {
  constructor() {
    super(Joi.object({
      'content-type': Joi.string().valid(
          'image/apng',
          'image/avif',
          'image/gif',
          'image/jpeg',
          'image/png',
          'image/webp',
      ).required(),
    }).unknown());
  }
}

export default UploadAlbumValidator;
