import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAllFavoritePokemons } from '../store/actions';
import Favorites from '../components/Favorites';

export class FavoritePokemonsContainer extends Component {
  constructor(props) {
    super(props);
    console.log(props.favorites);
  }
  render() {
    let activeSpinnerClass = this.props.favoritePokemons === undefined ? 'active' :'';
      return (
        <div className="all-content-wrap">
        <div className={`loader-holder ${activeSpinnerClass}`}>
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <Favorites />
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

