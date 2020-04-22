import { createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import rootReducer from 'reducers/index';
import ajaxMiddleware from 'utils/ajax-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

let enhancer;
const middlewares = [thunkMiddleWare, ajaxMiddleware];

if (process.env.NODE_ENV === 'development') {
  enhancer = composeWithDevTools(applyMiddleware(...middlewares));
} else {
  enhancer = applyMiddleware(...middlewares);
}

export default function configureStore(initialState) {
  const store = {
    ...createStore(rootReducer, initialState, enhancer)
  };

  if (module.hot) {
    module.hot.accept('reducers/index', () => {
      const nextRootReducer = require('reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
