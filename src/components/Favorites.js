import React from 'react'
import { Link } from 'react-router-dom';

const Favorites = (props) => {
  return (
    <div className="content row">
     <h3 className="favorites-title">Favorites</h3>
      {props.favoritePokemons.length > 0 ?
        props.favoritePokemons.sort((a, b) => (a.id > b.id) ? 1 : -1).map(item => {
          return (
            <div key={item.name} className={`pokemon_favorite_item`}>
              <div className="star-wrapper">
                <span onClick={(e) => props.handleClick(e, item.id)}><i className={`fas fa-star fav`}></i></span>
              </div>
              <p className="pokemon_favorite_item_id">{item.id}</p>
              <p className="pokemon_favorite_item_name">{item.name}</p>
              <div className="link-wrapper">
                <Link className="pokemon_favorite_item_link" to={`pokemon/${item.id}`}>View pokemon</Link>
              </div>
            </div>
          )
        }) : <div className="favorite-placeholder-holder"><h3 className="">There is no favorites added.</h3></div>
      }
    </div>
  )
}
export default Favorites;
