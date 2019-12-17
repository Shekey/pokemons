import React from 'react';

const PokemonDetails = (props) => {
  return (
      <div className="content row">
        PokemonDetails for {props.match.params.name}
    </div>
  );
}

export default PokemonDetails;