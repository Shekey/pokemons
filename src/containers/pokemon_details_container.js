import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPokemon, clearPokemonDetails, toggleFavorites } from '../store/actions';
import PokeDetails from '../components/Details';

export class PokemonDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.removeAnimation();
    this.props.getPokemon(this.props.match.params.id);
  }

  componentWillUnmount(){
    this.props.clearPokemonDetails();
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

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (prevProps.pokemon !== undefined && prevProps.pokemon !== null) {
      if (this.props.match.params.id != prevProps.pokemon.id) {
        this.props.clearPokemonDetails();
        this.props.getPokemon(this.props.match.params.id);
        this.render();
      }
    }
  }

  handleClick = (e, id, name) => {
    e.preventDefault();
    e.target.classList.toggle('fav');
    this.props.toggleFavorites(id, name);
  }

  handleNextButton = () => {
    let id = parseInt(this.props.match.params.id) + 1;
    this.props.history.push(`/pokemon/${id}`)
  }

  handlePrevButton = () => {
    let id = parseInt(this.props.match.params.id) - 1;
    id = id < 1 ? 1: id;
    this.props.history.push(`/pokemon/${id}`)
  }

  render() {
    let isLoaded = this.props.pokemon === undefined || this.props.pokemon === null ? false : true;
    return (
      <PokeDetails isLoaded={isLoaded} pokemon={this.props.pokemon} handleNextButton={() => this.handleNextButton()}
      handlePrevButton={() => this.handlePrevButton()}
      handleClick={(e) => this.handleClick(e, this.props.pokemon.id, this.props.pokemon.name)} />
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
