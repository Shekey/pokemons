import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {withRouter} from 'react-router'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

class AutocompleteComponent extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    let input = document.querySelector('.autocomplete-wrap input');
    if (this.props.location !== prevProps.location && input.value !== "") {
      let closeIcon = document.querySelector('.autocomplete-wrap .MuiAutocomplete-clearIndicator');
      closeIcon.click();
      input.blur();
    }
  }

  render() {
    return (
      this.props.allPokemonsNames !== undefined ?
        <div className="content row autocomplete">
         <Link className="logo-wrapper-center" to="/">
         <LazyLoad height={200}>
          <img className="logo" src="../images/logo-black.png" alt="Logo" />
          </LazyLoad>
          </Link>
          <div className="search-icon-mobile" onClick={(e) => this.props.showAutocomplete(e)}>
          <LazyLoad height={200}>
            <img src="images/loupe.png" alt="search loupe" />
          </LazyLoad>
          </div>
          <div className="autocomplete-wrap">
            <Autocomplete
              loading={true}
              options={this.props.allPokemonsNames}
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField {...params} label="Search for your pokemon" margin="normal" variant="outlined" fullWidth />
              )}
              blurOnSelect={true}
              onChange={(event, newValue) => {
                if(newValue && newValue.name !== null && newValue.name !== '') 
                this.props.history.push(`/pokemon/${newValue.id}`);
              }}
            />
          </div>
        </div>
        : null
    );
  }
}

export default withRouter(AutocompleteComponent)

