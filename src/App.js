import './scss/_all.scss';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import { connect } from 'react-redux'

import TypeDexContainer from './containers/type_dex_container';
import PokemonDetailsContainer from './containers/pokemon_details_container';
import FavoritesContainer from './containers/favorite_pokemons_container';
import PokeDex from './containers/pokemons_container';

class App extends Component {

  constructor(props) {
    super(props);
  }

  removeAnimation() {
    let pageWrapper = document.querySelector('.page-content-wrapper.active');
    let logoOnStart = document.querySelector('.logo-on-start.active');

    if(pageWrapper && logoOnStart) {
      setTimeout(() => {
        pageWrapper.classList.remove('active');
        logoOnStart.classList.remove('active'); 
      }, 1000);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.isLoadedApp || nextProps.isLoadedApp == null) {
      this.removeAnimation();
      return true;
    } else {
      return false;
    }
  }

  render() {
    let logoActiveClass = 'active';
    return (
      <div className={`page-content-wrapper ${logoActiveClass}`}>
        <div className={`logo-on-start ${logoActiveClass}`}></div>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route path="/" component={PokeDex} exact />
            <Route path="/typedex" component={TypeDexContainer} exact />
            <Route exact path="/pokemon/:id" component={PokemonDetailsContainer} exact />
            <Route path="/fav" component={FavoritesContainer} exact />
          </Switch>
        </BrowserRouter>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    isLoadedApp: state.pokemonReducer.isAppStarted
  };
}

export default connect(mapStateToProps)(App);
