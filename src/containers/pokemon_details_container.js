import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPokemon, clearPokemonDetails } from '../store/actions';
import PokeDetails from '../components/Details';

export class PokemonDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.props.getPokemon(this.props.match.params.id);
  }

  componentWillUnmount(){
    this.props.clearPokemonDetails();
  }

  render() {
    return (
      <PokeDetails pokemon={this.props.pokemon} />
    )
  }
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemonReducer.pokemon
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getPokemon, clearPokemonDetails},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetailsContainer)
