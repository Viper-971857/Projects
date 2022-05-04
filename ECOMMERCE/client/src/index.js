import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Assets/Router/Router';
import {Provider} from 'react-redux';
import store from './Store'

ReactDOM.render(

  <Provider store={store}>
      <Router/>
  </Provider>,

document.getElementById('root')
);


