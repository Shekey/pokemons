import React from 'react';
import ReactDOM from 'react-dom';
import './scss/_all.scss';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import pokemonReducer from './store/reducers/index';
import reduxThunk from 'redux-thunk';
import Navigation from './components/Navigation';

const store = createStore(pokemonReducer, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <div className="page-content-wrapper">
      <Navigation />
    <App />
    </div>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
