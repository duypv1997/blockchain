import BaseRequest from '../BaseRequest';

export default class UserRequest extends BaseRequest {
  getEndpoint() {
    return '/api/users'
  }

  getModelName() {
    return 'User';
  }

  getCode(params = {}) {
    const url = `${this.getEndpoint()}/getCode`;
    return this.post(url, params)
  }
}
