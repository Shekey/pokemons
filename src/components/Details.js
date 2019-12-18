import React from 'react';

const PokemonDetails = (props) => {
  console.log(props.pokemon)
  return (
    <div className="content row">
      {props.pokemon !== null && props.pokemon !== undefined ?
        <div className="pokemon-details-all">
          <div className='pokemon-first-row'>
            <span className={`pokemon-id`}># {props.pokemon.id}</span>
            <h3 className={`pokemon-name`}>{props.pokemon.name}</h3>
            {props.pokemon.types.map((item) => {
              return <div key={item.type.name} className={`${item.type.name}`}>{item.type.name}</div>
            })}
            <i className={`fas fa-star`}></i>
          </div>
          <div className="pokemon-second-row">
            <div className="pokemon-image">
              <figure>
                <img src={props.pokemon.sprites.front_default}
                  alt={props.pokemon.name} />
              </figure>
            </div>

            <div className="pokemon-info">
              <div className="pokemon-info-f-w">
                <h3>Info</h3>
              </div>

              <div className="pokemon-info-h-w">
                <p><span>Basic XP:</span><span>{props.pokemon.base_experience}</span></p>
                <p><span>Height:</span><span>{props.pokemon.height}</span></p>
                <p><span>Weight:</span><span>{props.pokemon.weight}</span></p>
              </div>

              <div className="pokemon-info-h-w">
                <p><span>Color:</span><span>{props.pokemon.color}</span></p>
                <p><span>Capture rate:</span><span>{props.pokemon.capture_rate}</span></p>
                <p><span>Habitat:</span><span>{props.pokemon.habitat}</span></p>
              </div>
            </div>
          </div>

          <div className="pokemon-third-row">
            <div className="pokemon-info-f-w">
              <h3>Abilities</h3>
            </div>

            {props.pokemon.abilities.map((item) => {
              return <div key={item.slot} className="pokemon-info-h-w">
                <p className="ability-title">{item.ability.name}</p>
                <p className="ability-desc">{item.desc}</p>
                {console.log(item.desc)}
              </div>
            })
            }
          </div>

          <div className="pokemon-fourth-row">
            <div className="pokemon-info-f-w">
              <h3>Moves</h3>
            </div>

            {

              props.pokemon.moves.map((item) => {

                if (item.acc !== undefined) {
                  return <div key={item.move.name} className="pokemon-info-h-w">
                    <p className="move-title">{item.move.name}</p>
                    <p className="ability-acc">{item.acc}</p>
                    <p className="ability-power">{item.pow}</p>
                  </div>
                }
              })
            }
          </div>
        </div>
        : null
      }
    </div>
  );
}

export default PokemonDetails;