import './scss/_all.scss';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';

import TypeDexContainer from './containers/type_dex_container';
import PokemonDetailsContainer from './containers/pokemon_details_container';
import FavoritesContainer from './containers/favorite_pokemons_container';
import PokeDex from './containers/pokemons_container';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Navigation />
        <Switch>
          <Route path="/" component={PokeDex} exact />
          <Route path="/typedex" component={TypeDexContainer} exact />
          <Route exact path="/pokemon/:id" component={PokemonDetailsContainer} exact />
          <Route path="/fav" component={FavoritesContainer} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
