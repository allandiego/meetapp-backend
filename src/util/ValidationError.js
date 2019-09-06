import BaseError from './BaseError';

class ValidationError extends BaseError {
  constructor(message, data = {}) {
    super(message);
    this.status = 401;
    this.user_title = data.user_title;
    this.user_msg = data.user_msg;
    this.field = data.field;
  }
}

export default ValidationError;
