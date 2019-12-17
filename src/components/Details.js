import React from 'react';
import Navigation from './Navigation';

const PokemonDetails = (props) => {
  console.log(props.match.params.name);
  console.log(props);
  return (
    <div className="page-content-wrapper">
      <Navigation />
      <div className="content row">
        PokemonDetails
    </div>
    </div>
  );
}

export default PokemonDetails;