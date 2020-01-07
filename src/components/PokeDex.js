import React from 'react'
import { Link } from 'react-router-dom';

const PokeDex = (props) => {
  function showPagination(props) {
    if (props.pokemons && props.pokemons.length > 0) {
      let lastPageActive = '',
        nextPageActive = '',
        currentPageActive = '';
      if (props.pokemons.lastPage === props.pokemons.nextPage) {
        lastPageActive = 'active'
      } else if (props.pokemons.nextPage === props.pokemons.lastPage) {
        nextPageActive = 'active'
      } else {
        currentPageActive = 'active';
      }

      document.querySelector('.lds-spinner').classList.remove('active');
      document.querySelector('.loader-holder').classList.remove('active');
      
      return (
        <div className="pagination" onClick={(e) => props.paginate(e)}>
          <button data-navigate={props.pokemons.firstPage} className="item">&lt;&lt;</button>
          <button data-navigate={props.pokemons.prevPage} className="item ">&lt;</button>
          <button data-navigate={props.pokemons.currentPage} className={`item ${currentPageActive}`}>{props.pokemons.currentPage}</button>
          <button data-navigate={props.pokemons.nextNumber} className={`item ${nextPageActive}`}>{props.pokemons.nextNumber}</button>
          <button data-navigate={props.pokemons.doubleNextNumber} className={`item ${lastPageActive}`}>{props.pokemons.doubleNextNumber}</button>
          <button data-navigate={props.pokemons.nextPage} className={`item`}>&gt;</button>
          <button data-navigate={props.pokemons.lastPage} className="item">&gt;&gt;</button>
        </div>
      )
    }
  }

  console.log(props)
  return (
    <div className="content row">
      {props.pokemons && props.pokemons.length > 0 ?

        props.pokemons.sort((a, b) => (a.id > b.id) ? 1 : -1).map(item => {
          let imageUrl = item.sprites.front_shiny !== null ? item.sprites.front_shiny : '../images/noImage.jpeg';
          let isFavorite = '';
          let favoritePokemons = JSON.parse(window.localStorage.getItem('favoritePokemons'));
          if(favoritePokemons !== null) {
            let isFavoritePokemon = favoritePokemons.find(i => i.id === item.id);
            if(isFavoritePokemon !== undefined) {
              isFavorite = 'fav';
            }
          }

          return (
            <Link key={item.name} className={`pokemon_item ${item.types[item.types.length - 1].type.name}`} to={`pokemon/${item.id}`}>
              <div className={`pokemon_item-content`}>
                <p className="pokemon_item-id">#{item.id}</p>
                <div className="specific-details">
                <p className="pokemon_item-name">{item.name}</p>
                  <div className="pokemon_item-height two-columns">
                    <p>H</p>
                    <p>{item.height}</p>
                  </div>
                  <div className="img-wrapper" style={{ backgroundImage: 'url(' + imageUrl + ')' }}></div>
                  <div className="pokemon_item-weight two-columns">
                    <p>W</p>
                    <p>{item.weight}</p>
                  </div>
                  <div className="star-wrapper">
                    <div href="#" onClick={(e,id,name) => props.handleClick(e, item.id, item.name)}><i className={`fas fa-star ${isFavorite}`}></i></div>
                  </div>
                </div>
                <div className="two-columns pokemon-xp">
                  <p>XP</p>
                  <p className="pokemon_item-xp">{item.base_experience}</p>
                </div>
              </div>
            </Link>
          )
        }) : null
      }

      {showPagination(props)}
    </div>
  )
}

export default PokeDex;