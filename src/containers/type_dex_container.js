import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAllTypes, getPOkemonByTypename } from '../store/actions';
import PokeTypes from '../components/TypeDex';

export class TypeDexContainer extends Component {
  constructor(props) {
    super(props);
    this.props.getAllTypes();
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

  handleClick = (item) => {
    console.log(item);
    this.props.getPOkemonByTypename(item);
    console.log(this.props);
  }

  render() {
    let activeSpinnerClass = this.props.pokeTypes === undefined ? 'active' :'';
      return (
        <div className="all-content-wrap">
        <div className={`loader-holder ${activeSpinnerClass}`}>
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <PokeTypes handleClick={this.handleClick} pokeTypes={this.props.pokeTypes}/>
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
  return bindActionCreators({ getAllTypes, getPOkemonByTypename }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeDexContainer)

