import BaseRequest from '../BaseRequest';

export default class AddressEthRequest extends BaseRequest {
  getEndpoint() {
    return '/api/addressEths'
  }

  getModelName() {
    return 'AddressEth';
  }
}
