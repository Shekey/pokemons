import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAllPokemons } from '../store/actions';
import PokeList from '../components/PokeDex';

export class PokemonContainer extends Component {

  constructor(props) {
    super(props);
    this.props.getAllPokemons();
  }
  render() {
    return (
      <div>
        <PokeList pokemons={this.props.pokemonContainer}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pokemonContainer: state.pokemonReducer.allPokemons
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getAllPokemons},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonContainer)

