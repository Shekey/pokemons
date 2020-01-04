import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function AutocompleteComponent(props) {
  console.log(props.allPokemonsNames)
  return (
    props.allPokemonsNames !== undefined ?
      <div className="content row autocomplete">
        <div className="autocomplete-wrap">
          <Autocomplete
            loading="true"
            options={props.allPokemonsNames.map(option => option.name)}
            renderInput={params => (
              <TextField {...params} label="Search for your pokemon" margin="normal" variant="outlined" fullWidth />
            )}
          />
        </div>
      </div>
      : null
  );
}
