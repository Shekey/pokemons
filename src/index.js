import React from 'react';
import ReactDOM from 'react-dom';
import './scss/_all.scss';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import pokemonReducer from './store/reducers/index';
import reduxThunk from 'redux-thunk';


  export const store = createStore(pokemonReducer, applyMiddleware(reduxThunk));
if (typeof window !== 'undefined') {

  let root = document.getElementById('root');
  ReactDOM.hydrate(
    <Provider store={store}>
      <App />
    </Provider>
    , root);
}

    

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
