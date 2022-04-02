import Joi from 'joi';
import Validator from '../../../../core/utils/Validator';

class PlaylistValidator extends Validator {
  constructor() {
    super(Joi.object({
      name: Joi.string().required(),
    }));
  }
}

export default PlaylistValidator;
