import BaseError from './BaseError';

class HttpError extends BaseError {
  constructor(message, data = {}) {
    super(message);
    this.status = data.status;
    this.user_title = data.user_title;
    this.user_msg = data.user_msg;
  }
}

export default HttpError;
