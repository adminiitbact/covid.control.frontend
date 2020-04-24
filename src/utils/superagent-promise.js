/**
 * Promise wrapper for superagent
 */

function wrap(superagent, Promise, interceptor) {
  /**
   * Request object similar to superagent.Request, but with end() returning
   * a promise.
   */
  function PromiseRequest() {
    superagent.Request.apply(this, arguments);
  }

  // Inherit form superagent.Request
  PromiseRequest.prototype = Object.create(superagent.Request.prototype);

  /** Send request and get a promise that `end` was emitted */
  PromiseRequest.prototype.end = function end(cb) {
    const _end = superagent.Request.prototype.end;
    const self = this;  

    return new Promise((accept, reject) => {
      _end.call(self, (err, response) => {
        if (cb) {
          cb(err, response);
        }

        if (err) {
          reject(err);
        } else {
          accept(response);
        }
      });
    });
  };

  function isObject(obj) {
    return obj === Object(obj);
  }

  function serialize(obj) {
    if (!isObject(obj)) {
      return obj;
    }

    const pairs = [];

    Object.keys(obj).forEach(key => {
      if (obj[key] !== null && obj[key] !== undefined) {
        if (obj[key] instanceof Array) {
          for (let i = 0, len = obj[key].length; i < len; i += 1) {
            pairs.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(obj[key][i])}`);
          }
        } else {
          pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
        }
      }
    });

    return pairs.join('&');
  }

  PromiseRequest.prototype.query = function query(val) {
    // Convert array parameters to query string which is not supported in this
    // version of superagent
    if (typeof val !== 'string') {
      val = serialize(val);
    }

    if (val) {
      this._query.push(val);
    }

    return this;
  };

  /** Provide a more promise-y interface */
  PromiseRequest.prototype.then = function then(resolve, rej) {
    const _end = superagent.Request.prototype.end;
    const self = this;

    return new Promise((accept, reject) => {
      _end.call(self, (err, response) => {
        // Interceptor code
        if (interceptor) {
          interceptor(
            (e, r) => {
              if (e) {
                reject(e);
              } else {
                accept(r);
              }
            }
          )(err, response);
        } else {
          if (err) {
            reject(err);
          } else {
            accept(response);
          }
        }
      });
    }).then(resolve, rej);
  };

  /* Returns a request object with 'then' method overridden
   * When xhr has been fulfilled, 'Then' method fulfils with the cached response
   * For all other cases, returning 'this' i.e. PromiseRequest object on which getCachedRequest was called
   */
  PromiseRequest.prototype.getCachedRequest = function getCachedRequest() {
    const resp = new superagent.Response(this);
    if (resp.body && resp.xhr && resp.xhr.readyState === 4) {
      const FakeRequest = Object.assign({}, this);
      FakeRequest.then = function then(resolve, rej) {
        return new Promise((accept, reject) => {
          if (resp.error) {
            reject(resp);
          } else {
            accept(resp);
          }
        }).then(resolve, rej);
      };
      const retReq = FakeRequest;
      return retReq;
    } else {
      return this;
    }
  };

  /*
   * Returns response associated with the PromiseRequest object
   */
  PromiseRequest.prototype.getResponse = function getResponse() {
    if (!this.xhr) {
      return {};
    }
    return new superagent.Response(this);
  };

  /**
   * Request builder with same interface as superagent.
   * It is convenient to import this as `request` in place of superagent.
   */
  const request = function req(method, url) {
    return new PromiseRequest(method, url);
  };

  /** Helper for making an options request */
  request.options = function opt(url) {
    return request('OPTIONS', url);
  };

  /** Helper for making a head request */
  request.head = function head(url, data) {
    const req = request('HEAD', url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  /** Helper for making a get request */
  request.get = function get(url, data) {
    const req = request('GET', url);
    if (data) {
      req.query(data);
    }
    return req;
  };

  /** Helper for making a post request */
  request.post = function post(url, data) {
    const req = request('POST', url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  /** Helper for making a put request */
  request.put = function put(url, data) {
    const req = request('PUT', url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  /** Helper for making a patch request */
  request.patch = function patch(url, data) {
    const req = request('PATCH', url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  /** Helper for making a delete request */
  request.del = function del(url, data) {
    const req = request('DELETE', url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  // Export the request builder
  return request;
}

export default wrap;
