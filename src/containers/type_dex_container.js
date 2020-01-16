import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAllTypes, getPOkemonByTypename, clearPokemonsByName } from '../store/actions';
import PokeTypes from '../components/TypeDex';
import TypesList from '../components/Types';

let typeClicked = '';

export class TypeDexContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.props.getAllTypes();
  }

  componentDidMount() {
    this.removeAnimation();
  }

  componentWillUnmount(){
    this.props.clearPokemonsByName();
    typeClicked = '';
  }

  removeAnimation() {
    let pageWrapper = document.querySelector('.page-content-wrapper.active');
    let logoOnStart = document.querySelector('.logo-on-start.active');

    if(pageWrapper && logoOnStart) {
      setTimeout(() => {
        pageWrapper.classList.remove('active');
        logoOnStart.classList.remove('active'); 
      }, 1700);
    }
  }

  handleClick = (item) => {
    typeClicked = item;
    this.props.getPOkemonByTypename(item);
    this.props.history.push(`/typedex/${item}`);
  }

  closeList = () => {
    let hideList = document.querySelector('.type-by-name-active');
    if(hideList) {
      hideList.classList.remove('type-by-name-active');
      typeClicked = '';
      this.props.clearPokemonsByName();
    }
  }

  render() {
    let activeSpinnerClass = this.props.pokeTypes === undefined ? 'active' :'';
    let isPokeTypesByNameVisible = this.props.pokeTypesByName !== undefined && this.props.pokeTypesByName !== null ? 'type-by-name-active':'';
      return (
        <div className={`all-content-wrap ${isPokeTypesByNameVisible}`}>
        <div className={`loader-holder ${activeSpinnerClass}`}>
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <PokeTypes handleClick={this.handleClick} pokeTypes={this.props.pokeTypes}/>
        {this.props.pokeTypesByName !== null && <TypesList typeClicked={typeClicked} closeList={this.closeList} pokeTypes={this.props.pokeTypesByName}/> }
      </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    pokeTypes: state.pokemonReducer.pokeTypes,
    pokeTypesByName: state.pokemonReducer.pokemonsByType
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllTypes, getPOkemonByTypename, clearPokemonsByName }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeDexContainer)

