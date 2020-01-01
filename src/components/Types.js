import React from 'react'
import { Link } from 'react-router-dom';

const Types = (props) => {
  return (
    <div className="content row types-by-name-list">
      <div className={`type-name-title ${props.typeClicked}`}>
      <h3>{props.typeClicked}</h3>
      <div className="image-wrapper" onClick={() => props.closeList()}>
        <img src="../images/backBtn.png" className={`back-btn`} /></div>
      </div>
      {props.pokeTypes !== undefined ?
        props.pokeTypes.map((item, index) => {
        let pokemonId = item.pokemon.url.split("pokemon/")[1];
        pokemonId = pokemonId.substring(0,pokemonId.length - 1);
          return (
            <div key={index} className={`pokemon_typebyname_item`}>
              <p className="pokemon_typebyname_item_id">{pokemonId}</p>
              <p className="pokemon_typebyname_item_name">{item.pokemon.name}</p>
              <div className="link-wrapper">
                <Link className="pokemon_typebyname_item_link" to={`pokemon/${pokemonId}`}>View pokemon</Link>
              </div>
            </div>
          )
        }) : <div className="typebyname-placeholder-holder"><h3 className="">There is no pokemons with this type.</h3></div>
      }
    </div>
  )
}
export default Types;
