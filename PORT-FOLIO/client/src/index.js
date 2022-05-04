import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Router from './Assets/Router/Route';
import store from './Store';
import {Provider as AlertProvider,positions,transitions} from 'react-alert';
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.SCALE,
};

ReactDOM.render(

  // <Provider store={store}>
  //     <AlertProvider template={AlertTemplate} {...options}>
  //       <Router/>
  //     </AlertProvider>
  //   </Provider>,


  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Router/>
      </AlertProvider>
    </Provider>
  </React.StrictMode>,

document.getElementById('root')
);