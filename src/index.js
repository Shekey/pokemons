import React from 'react';
import ReactDOM from 'react-dom';
import './scss/_all.scss';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import pokemonReducer from './store/reducers/index';
import reduxThunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
export const store = createStore(pokemonReducer, applyMiddleware(reduxThunk));

  let rootElement = document.getElementById('root');
  if (window.hasRestoredState) {
    ReactDOM.hydrate(<Provider store={store}>
      <App />
    </Provider>, rootElement);
  } else {
    ReactDOM.render(<Provider store={store}>
      <App />
    </Provider>, rootElement);
  }

  serviceWorker.register();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
