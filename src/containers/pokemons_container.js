import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAllPokemons, setCurrentPage,getAllPokemonsNames } from '../store/actions';
import PokeList from '../components/PokeDex';
import Autocomplete from '../components/Autocomplete';

export class PokemonContainer extends Component {
  constructor(props) {
    super(props);
    this.props.getAllPokemons(0, 9);
    this.removeAnimation();
  }

  componentDidMount() {
    this.props.getAllPokemonsNames();
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

  paginate(e) {
    let datasetClicked = e.target.dataset.navigate;
    let offset = (datasetClicked - 1) * 9;
    if (this.props.pokemonContainer.currentPage != datasetClicked) {
      this.props.setCurrentPage(datasetClicked);
      this.props.getAllPokemons(offset, 9);
      document.querySelector('.lds-spinner').classList.add('active');
      document.querySelector('.loader-holder').classList.add('active');
    }
  }

  render() {
    let isAppStarted =  document.querySelector('.logo-on-start.active');
    let activeSpinnerClass = this.props.pokemonContainer === undefined && isAppStarted !== null ? 'active' :'';
      return (
        <div className="all-content-wrap">
        <div className={`loader-holder ${activeSpinnerClass}`}>
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <Autocomplete allPokemonsNames={this.props.pokemonsNames}/>
        <PokeList paginate={(e) => this.paginate(e)} pokemons={this.props.pokemonContainer} />
      </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    pokemonContainer: state.pokemonReducer.allPokemons,
    pokemonsNames: state.pokemonReducer.allPokemonsNames
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllPokemons, setCurrentPage,getAllPokemonsNames}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonContainer)

