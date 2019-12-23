import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAllPokemons, setCurrentPage } from '../store/actions';
import PokeList from '../components/PokeDex';

export class PokemonContainer extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.props.getAllPokemons(0,9);
  }

  paginate(e) {
    let datasetClicked = e.target.dataset.navigate;
    let offset = (datasetClicked - 1) * 9;
    if(this.props.pokemonContainer.currentPage != datasetClicked) {
      console.log(datasetClicked);
      this.props.setCurrentPage(datasetClicked);
      this.props.getAllPokemons(offset,9);
    }
  }
  render() {
    return (
      <PokeList paginate={(e) => this.paginate(e)} pokemons={this.props.pokemonContainer}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    pokemonContainer: state.pokemonReducer.allPokemons
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getAllPokemons,setCurrentPage},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonContainer)

