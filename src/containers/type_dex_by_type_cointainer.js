import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getPOkemonByTypename, clearPokemonsByName } from '../store/actions';
import TypesList from '../components/Types';

let typeClicked = '';

export class TypeDexByTypeContainer extends PureComponent {
  constructor(props) {
    super(props);
    let type = this.props.match.params.type;
    typeClicked = type;
    if(type !=='') this.props.getPOkemonByTypename(type);
  }

  componentDidMount() {
    this.removeAnimation();
  }

  componentWillUnmount(){
    this.props.clearPokemonsByName();
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

  goBack(e) {
    e.preventDefault();
    this.props.history.goBack();
  }

  render() {
    let activeSpinnerClass = this.props.pokeTypesByName === undefined ? 'active' :'';
    let isPokeTypesByNameVisible = this.props.pokeTypesByName !== undefined && this.props.pokeTypesByName !== null ? 'type-by-name-active':'';
      return (
        <div className={`all-content-wrap ${isPokeTypesByNameVisible}`}>
        <div className={`loader-holder ${activeSpinnerClass}`}>
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        {this.props.pokeTypesByName !== null && <TypesList typeClicked={typeClicked} goBack={(e) => this.goBack(e)} pokeTypes={this.props.pokeTypesByName}/> }
      </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    pokeTypesByName: state.pokemonReducer.pokemonsByType
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPOkemonByTypename, clearPokemonsByName }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeDexByTypeContainer)

