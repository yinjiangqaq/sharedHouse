// import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import React from 'react';
import makeStore from './store/index';
import { StoreContext } from 'redux-react-hook'; //为了全局保存store

const store = makeStore(); //创建store对象，然后StoreContext全局保存
ReactDOM.render(
  <StoreContext.Provider value={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreContext.Provider>,
  document.getElementById('root')
);
