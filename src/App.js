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
import TypeDexByTypeContainer from './containers/type_dex_by_type_cointainer';
import PokeDex from './containers/pokemons_container';
import { bindActionCreators } from 'redux';

class App extends Component {

  constructor(props) {
    super(props);
    this.props.getAllPokemonsNames();
    let isMobile = window.matchMedia("(max-width: 999px)");

    if (isMobile.matches) {
      let root = document.getElementById("root");
      root.classList.add('close');
    }

    window.addEventListener('resize', () => {
      let root = document.getElementById("root");
      if (isMobile.matches && !root.classList.contains('close')) {
        root.classList.add('close');
      }
    })
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

    let isMobile = window.matchMedia("(max-width: 999px)");
    if (isMobile.matches) {
      let allContent = document.querySelector(".page-content-wrapper");
      let root = document.getElementById("root");
      allContent.addEventListener('click', e => {
        if(e.target.classList.contains('page-content-wrapper') && !root.classList.contains('close')) {
          root.classList.add('close');
        }
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      let root = document.getElementById("root");
      root.classList.add('close');
    }
  }


  openNav() {
    let root = document.getElementById("root");
    root.classList.remove('close');
  }

  closeNav() {
    let pokemonDetailsAll = document.querySelector('.pokemon-details-all');
    if (pokemonDetailsAll) pokemonDetailsAll.classList.add('not-initial')
    let root = document.getElementById("root");
    root.classList.add('close');
  }

  removeAnimation() {
    let pageWrapper = document.querySelector('.page-content-wrapper.active');
    let logoOnStart = document.querySelector('.logo-on-start.active');

    if(pageWrapper && logoOnStart) {
      setTimeout(() => {
        pageWrapper.classList.remove('active');
        logoOnStart.classList.remove('active'); 
      }, 1700);
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

  handleNavigationItemClicked() {
    let isMobile = window.matchMedia("(max-width: 999px)");
    let root = document.querySelector('#root');
    if (isMobile.matches && !root.classList.contains('close')) {
      root.classList.add('close');
    }

    let autocompleteInput = document.querySelector('.autocomplete-wrap');
    if(autocompleteInput.classList.contains('active')) {
      let searchIconMobile = document.querySelector('.search-icon-mobile');
      let logoCenterMobile = document.querySelector('.logo-wrapper-center');
      setTimeout( () => {
        searchIconMobile.classList.remove('hide');
        logoCenterMobile.classList.remove('hide');
      }, 500)
      autocompleteInput.classList.remove('active');
    }
  }

  showAutocomplete(e) {
    e.target.parentNode.classList.add('hide');
    let autocompleteInput = document.querySelector('.autocomplete-wrap');
    let logoCenterMobile = document.querySelector('.logo-wrapper-center');
    if(autocompleteInput) {
      autocompleteInput.classList.add('active');
      logoCenterMobile.classList.add('hide');

      let pageWrapper = document.querySelector('.page-content-wrapper');
      pageWrapper.addEventListener('click', () => {
        let isFocused = pageWrapper.querySelector('.Mui-focused');
        if(autocompleteInput.classList.contains('active') && !isFocused) {
          autocompleteInput.classList.remove('active');

          let searchIconMobile = document.querySelector('.search-icon-mobile');
          setTimeout( () => {
            searchIconMobile.classList.remove('hide');
            logoCenterMobile.classList.remove('hide');
          }, 350)
        }
      })
    }
  }

  render() {
    let logoActiveClass = 'active';
    return (
      <div className={`page-content-wrapper ${logoActiveClass}`}>
        <div className={`logo-on-start ${logoActiveClass}`}></div>
        <BrowserRouter>
          <Navigation handleNavigationItemClicked = {() =>this.handleNavigationItemClicked()}/>
          <span className="burger">&#9776;</span>
          <Switch>
            <Route path="/" component={PokeDex} exact />
            <Route path="/typedex" component={TypeDexContainer} exact />
            <Route exact path="/pokemon/:id" component={PokemonDetailsContainer} exact />
            <Route exact path="/typedex/:type" component={TypeDexByTypeContainer} exact />
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
