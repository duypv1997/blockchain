import BaseRequest from '../BaseRequest';

export default class TransactionRequest extends BaseRequest {
  getEndpoint() {
    return '/api/transactions'
  }

  getModelName() {
    return 'Transaction';
  }
}
