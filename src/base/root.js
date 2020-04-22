import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'store/index';
import Routes from './routes';

const store = configureStore();
window.reduxStore = store;

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>{Routes()}</BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
