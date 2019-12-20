import React from 'react'
import { Link } from 'react-router-dom';

const PokeDex = (props) => {
  return (
    <div className="content row">
      {props.pokemons && props.pokemons.length > 0 ?
        props.pokemons.sort((a, b) => (a.id > b.id) ? 1 : -1).map(item => (
          <Link key={item.name} className={`pokemon_item ${item.types[item.types.length - 1].type.name}`} to={`pokemon/${item.id}`}>
            <div className={`pokemon_item-content`}>
              <p className="pokemon_item-id">#{item.id}</p>
              <p className="pokemon_item-name">{item.name}</p>
              <div className="specific-details">
                <div className="pokemon_item-height two-columns">
                  <p>H</p>
                  <p>{item.height}</p>
                </div>
                <div className="img-wrapper" style={{ backgroundImage: 'url(' + item.sprites.front_shiny + ')' }}></div>
                <div className="pokemon_item-weight two-columns">
                  <p>W</p>
                  <p>{item.weight}</p>
                </div>
              </div>
              <div className="two-columns pokemon-xp">
                <p>XP</p>
                <p className="pokemon_item-xp">{item.base_experience}</p>
              </div>
              </div>
          </Link>
        )) : null
      }
    </div >
  )
}

export default PokeDex;