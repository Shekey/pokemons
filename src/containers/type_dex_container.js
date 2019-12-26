import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getAllTypes } from '../store/actions';
import PokeTypes from '../components/TypeDex';

export class TypeDexContainer extends Component {
  constructor(props) {
    super(props);
    this.props.getAllTypes();
    console.log(props)
  }
  render() {
    let activeSpinnerClass = this.props.pokeTypes === undefined ? 'active' :'';
      return (
        <div className="all-content-wrap">
        <div className={`loader-holder ${activeSpinnerClass}`}>
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <PokeTypes pokeTypes={this.props.pokeTypes}/>
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
  return bindActionCreators({ getAllTypes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeDexContainer)

