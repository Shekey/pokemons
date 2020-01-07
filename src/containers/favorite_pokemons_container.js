import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAllFavoritePokemons, toggleFavorites } from '../store/actions';
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

  handleClick = (e, id, name) => {
    e.preventDefault();
    e.target.classList.toggle('fav');
    this.props.toggleFavorites(id, name);
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
          <Favorites handleClick={(e, id, name) => this.handleClick(e, id, name)} favoritePokemons={favoritePokemons} />
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
  return bindActionCreators({ getAllFavoritePokemons,toggleFavorites }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePokemonsContainer)

