import NotImplementedException from './exceptions/NotImplementedException';

export default class BaseRequest {
  getEndpoint() {
    throw new NotImplementedException('getEndpoint must be implemented');
  }

  getModelName() {
    throw new NotImplementedException('convert must be implemented');
  }

  get(id, params = {}) {
    const url = `${this.getEndpoint()}/${id}`;
    return this._get(url, params);
  }

  getAll(params = {}) {
    return this._get(this.getEndpoint(), params);
  }

  update(id, params = {}) {
    const url = `${this.getEndpoint()}/${id}`;
    return this.put(url, params);
  }

  delete(id, params = {}) {
    const url = `${this.getEndpoint()}/${id}`;
    return this._delete(url, params);
  }

  create(params = {}) {
    const url = this.getEndpoint();
    return this.post(url, params);
  }

  _get(url, params = {}) {
    return new Promise((resolve, reject) => {
      window.axios
        .get(url, {
          params: params
        })
        .then((response) => {
          this._responseHandler(resolve, response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  put(url, data = {}) {
    return new Promise((resolve, reject) => {
      window.axios
        .put(url, data)
        .then((response) => {
          this._responseHandler(resolve, response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      window.axios
        .post(url, data)
        .then((response) => {
          this._responseHandler(resolve, response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  _delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      window.axios
        .delete(url, { params: params } )
        .then((response) => {
          this._responseHandler(resolve, response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  _responseHandler(resolve, res) {
    return resolve(res.data);
  }

  _errorHandler(reject, err) {
    window.app.$broadcast('EVENT_COMMON_ERROR', err);
    return reject(err);
  }

}
