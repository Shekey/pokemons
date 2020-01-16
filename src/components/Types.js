import React from 'react'
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

const Types = (props) => {
  return (
    <div className="content row types-by-name-list">
      <div className={`type-name-title`}>
      <h3 className={`${props.typeClicked}`}>{props.typeClicked}</h3>
      <div className="image-wrapper" onClick={(e) => props.goBack(e)}>
        <img src="../images/backBtn.png" className={`back-btn`} alt="Back button desktop" />
        <img src="../images/backIcon.png" className={`back-btn mobile`} alt="Back button mobile" /></div>
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
                <Link className="pokemon_typebyname_item_link" to={`/pokemon/${pokemonId}`}><span>View pokemon</span><span>&gt;</span></Link>
              </div>
            </div>
          )
        }) : <div className="typebyname-placeholder-holder"><h3 className="">There is no pokemons with this type.</h3></div>
      }
    </div>
  )
}
export default Types;
