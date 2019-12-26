import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAllFavoritePokemons } from '../store/actions';
import PokeTypes from '../components/TypeDex';

export class TypeDexContainer extends Component {
  render() {
    // let activeSpinnerClass = this.props.favoritePokemons === undefined ? 'active' :'';
      return (
        <div className="all-content-wrap">
        <div className={`loader-holder`}>
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <PokeTypes/>
      </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    pokeTypes: state.pokemonReducer.pokeTypes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllFavoritePokemons }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeDexContainer)

