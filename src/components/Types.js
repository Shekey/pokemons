import React from 'react'
import { Link } from 'react-router-dom';

const Types = (props) => {
  return (
    <div className="content row">
      POKETYPES
      {props.pokeTypes !== undefined ?
        props.pokeTypes.sort((a, b) => (a.id > b.id) ? 1 : -1).map(item => {
          return (
            <div key={item.name} className={`pokemon_favorite_item`}>
              
            </div>
          )
        }) : null
      }
    </div>
  )
}
export default Types;
