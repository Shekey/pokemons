import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPokemon, clearPokemonDetails, toggleFavorites } from '../store/actions';
import PokeDetails from '../components/Details';

export class PokemonDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.props.getPokemon(this.props.match.params.id);
  }

  componentWillUnmount(){
    this.props.clearPokemonDetails();
  }

  handleClick = (e, id) => {
    e.preventDefault();
    this.props.toggleFavorites(id);
    console.log('clicked');
  }

  render() {
    return (
      <PokeDetails pokemon={this.props.pokemon} handleClick={(e) => this.handleClick(e, this.props.pokemon.id)} />
    )
  }
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemonReducer.pokemon
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getPokemon, clearPokemonDetails, toggleFavorites},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetailsContainer)
