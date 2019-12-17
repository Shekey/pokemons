import './scss/_all.scss';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Favorites from './components/Favorites';
import TypeDex from './components/TypeDex';
import PokemonDetails from './components/Details';
import PokeDex from './containers/pokemons_container';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={PokeDex} exact />
          <Route path="/typedex" component={TypeDex} exact />
          <Route path="/pokemon/:name" component={PokemonDetails} exact />
          <Route path="/fav" component={Favorites} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
