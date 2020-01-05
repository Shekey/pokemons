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
            loading={true}
            options={props.allPokemonsNames}
            getOptionLabel={option => option.name}
            renderInput={params => (
              <TextField {...params} label="Search for your pokemon" margin="normal" variant="outlined" fullWidth />
            )}
            onChange={(event, newValue) => {
              console.log(newValue);
              if(newValue.name !== null && newValue.name !== '') 
              props.history.push(`/pokemon/${newValue.id}`);
              newValue.name = '';
            }}
          />
        </div>
      </div>
      : null
  );
}
