/* eslint-disable no-useless-constructor */
import Promise from 'promise';

class extendPromise extends Promise {
  constructor(params) {
    super(params);
  }

  abort() {
    console.log('aborted');
  }
}

export default function stub(json, timeout = 1000) {
  return new extendPromise(resolve => {
    setTimeout(() => {
      resolve(json);
    }, timeout);
  });
}
