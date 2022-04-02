import ClientError from '../exceptions/ClientError.js';
import ServerError from '../exceptions/ServerError.js';

class Response {
  static create400Response({
    h,
    message,
    code = 400,
  }) {
    const response = h.response({
      status: 'fail',
      message,
    });
    response.code(code);

    return response;
  }

  static create500Response({
    h,
    message,
    code = 500,
  }) {
    const response = h.response({
      status: 'error',
      message,
    });
    response.code(code);

    return response;
  }

  static create200Response({
    h,
    message,
    data,
    code = 200,
  }) {
    let response;

    if (message && data) {
      response = h.response({
        status: 'success',
        message,
        data,
      });
    } else if (data) {
      response = h.response({
        status: 'success',
        data,
      });
    } else if (message) {
      response = h.response({
        status: 'success',
        message,
      });
    }

    response.code(code);

    return response;
  }

  static handleError(h, error) {
    if (error instanceof ClientError) {
      return this.create400Response({
        h,
        message: error.message,
        code: error.statusCode,
      });
    }

    if (error instanceof ServerError) {
      return this.create500Response({
        h,
        message: error.message,
        code: error.statusCode,
      });
    }

    console.log(error.message);

    return this.create500Response({
      h,
      message: 'Terjadi kesalahan',
    });
  }
}

export default Response;
