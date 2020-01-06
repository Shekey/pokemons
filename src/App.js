import './scss/_all.scss';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import Navigation from './components/Navigation';
import { connect } from 'react-redux'
import { getAllPokemonsNames } from './store/actions';
import Autocomplete from './components/Autocomplete';
import TypeDexContainer from './containers/type_dex_container';
import PokemonDetailsContainer from './containers/pokemon_details_container';
import FavoritesContainer from './containers/favorite_pokemons_container';
import PokeDex from './containers/pokemons_container';
import { bindActionCreators } from 'redux';

class App extends Component {

  constructor(props) {
    super(props);
    this.props.getAllPokemonsNames();
    console.log(this.props);
  }

  componentDidMount() {
    let exit = document.querySelector('.exit');
    let burger = document.querySelector('.burger');
    if(exit) {
      exit.addEventListener('click', e => {
        e.preventDefault();
        this.closeNav();
      });
    }

    if(burger) {
      burger.addEventListener('click', e => {
        e.preventDefault();
        this.openNav();
      });
    }
  }


openNav() {
  let sideNav = document.querySelector(".side-nav");
  let contentWrap = document.querySelector(".all-content-wrap");
  let row = contentWrap.querySelector('.row');
  let pokemonDetailsAll = contentWrap.querySelector('.pokemon-details-all');
  let root = document.getElementById("root");
  sideNav.classList.remove('close');
  root.classList.remove('close');
  if(row) {  row.classList.remove('close'); } else {pokemonDetailsAll.classList.remove('close'); }
}

closeNav() {
  let sideNav = document.querySelector(".side-nav");
  let contentWrap = document.querySelector(".all-content-wrap");
  let row = contentWrap.querySelector('.row');
  let pokemonDetailsAll = contentWrap.querySelector('.pokemon-details-all');
  let root = document.getElementById("root");
  root.classList.add('close');
  sideNav.classList.add('close');
  if(row) {  row.classList.add('close'); } else {pokemonDetailsAll.classList.add('close'); }
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
          <span className="burger">&#9776;</span>
          <Autocomplete allPokemonsNames={this.props.pokemonsNames}/>
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
    isLoadedApp: state.pokemonReducer.isAppStarted,
    pokemonsNames: state.pokemonReducer.allPokemonsNames
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({getAllPokemonsNames}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
