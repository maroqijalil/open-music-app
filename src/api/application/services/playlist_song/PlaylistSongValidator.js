import Joi from 'joi';
import Validator from '../../../../core/utils/Validator.js';

class PlaylistSongValidator extends Validator {
  constructor() {
    super(Joi.object({
      songId: Joi.string().required(),
    }));
  }
}

export default PlaylistSongValidator;
