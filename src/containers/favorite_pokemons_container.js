import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAllFavoritePokemons } from '../store/actions';
import Favorites from '../components/Favorites';

export class FavoritePokemonsContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.removeAnimation();
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

  render() {
    let favoritePokemons = JSON.parse(window.localStorage.getItem('favoritePokemons'));
    favoritePokemons = favoritePokemons === null ? []:favoritePokemons;
      return (
        <div className="all-content-wrap">
        <div className={`loader-holder`}>
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <div className="favorite-pokemons-wrapper">
          <Favorites favoritePokemons={favoritePokemons} />
          </div>
      </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    favoritePokemons: state.pokemonReducer.favorites
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllFavoritePokemons }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePokemonsContainer)

