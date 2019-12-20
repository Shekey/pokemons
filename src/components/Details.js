import React from 'react';

const PokemonDetails = (props) => {
  return (
    <div className="content row">
      {props.pokemon !== null && props.pokemon !== undefined ?
        <div className="pokemon-details-all">
          <div className='pokemon-first-row'>
            <span className={`pokemon-id`}># {props.pokemon.id}</span>
            <h5 className={`pokemon-name`}>{props.pokemon.name}</h5>
            {props.pokemon.types.map((item) => {
              return <div key={item.type.name} className={`${item.type.name} pokemon-type`}>{item.type.name}</div>
            })}
            <div className="star-wrapper">
            <a href="#" onClick={(e) => props.handleClick(e, props.pokemon.id)}><i className={`fas fa-star`}></i></a>
            </div>
          </div>

          <div className="pokemon-second-row">
            <div className="pokemon-image">
              <figure>
                <img src={props.pokemon.sprites.front_shiny}
                  alt={props.pokemon.name} />
              </figure>
            </div>

            <div className="pokemon-info">
              <div className="pokemon-info-f-w">
                <h5>Info</h5>
              </div>

              <div className="pokemon-info-h-w">
                <p><span>Basic XP</span><span>{props.pokemon.base_experience}</span></p>
                <p><span>Height</span><span>{props.pokemon.height}</span></p>
                <p><span>Weight</span><span>{props.pokemon.weight}</span></p>
              </div>

              <div className="pokemon-info-h-w">
                <p><span>Color</span><span>{props.pokemon.color}</span></p>
                <p><span>Capture rate</span><span>{props.pokemon.capture_rate}</span></p>
                <p><span>Habitat</span><span>{props.pokemon.habitat}</span></p>
              </div>
            </div>
          </div>

          <div className="pokemon-third-row">
            <div className="pokemon-info-f-w">
              <h5>Abilities</h5>
            </div>

            {props.pokemon.abilities.map((item) => {
              return <div key={item.slot} className="pokemon-info-h-w">
                <p className="ability-title">{item.ability.name}</p>
                <p className="ability-desc">{item.desc}</p>
              </div>
            })
            }
          </div>

          <div className="pokemon-fourth-row">
            <div className="pokemon-info-f-w">
              <h5>Moves</h5>
            </div>

            {

              props.pokemon.moves.map((item) => {

                if (item.acc !== undefined) {
                  return <div key={item.move.name} className="pokemon-info-h-w">
                    <p className="move-title">{item.move.name}</p>
                    <div className="moves-details">
                      <div className="accuracy-wrap">
                        <p>Accuracy</p>
                        <p className="ability-acc">{item.acc}</p>
                      </div>

                      <div className="power-wrap">
                        <p>Accuracy</p>
                        <p className="ability-power">{item.pow}</p>
                      </div>
                    </div>
                  </div>
                }
              })
            }
          </div>

          <div className="pokemon-fifth-row">
            <div className="pokemon-info-f-w">
              <h5>Evolution</h5>
            </div>
              {
                showEvolve(props.pokemon.evolveForms, props.pokemon)
              }
          </div>
        </div>
        : null
      }
    </div>
  );
}

const showEvolve = (evolveForms, currentPokemon) => {
  let isFirstItem = evolveForms.find( item => item.name === currentPokemon.name);
  let evolveFormsJSX = evolveForms.map((item) => (
    <div key={item.name} className={`pokemon-info-evolve-item`}>
      <div className="img-wrapper">
        <img src={item.imageUrl} />
      </div>
      <h5>{item.name}</h5>
      <div className="pokemon-type-wrap">
        {item.types.map((i) => {
          return <div key={`type-${i.type.name}`} className={`${i.type.name} pokemon-type`}>{i.type.name}</div>
        })}
      </div>
    </div>
  ));

  if(isFirstItem === undefined) {
    return (
    <div className="pokemon-info-evolve">
    <div key={currentPokemon.name} className={`pokemon-info-evolve-item`}>
      <div className="img-wrapper">
        <img src={currentPokemon.sprites.front_shiny} />
      </div>
      <h5>{currentPokemon.name}</h5>
      <div className="pokemon-type-wrap">
        {currentPokemon.types.map((i) => {
          return <div key={`type-${i.type.name}`} className={`${i.type.name} pokemon-type`}>{i.type.name}</div>
        })}
      </div>
    </div>
    {evolveFormsJSX}
    </div>
    )
  } else if (currentPokemon.name === evolveForms[evolveForms.length -1].name){
    return (
      <div className="pokemon-info-evolve">
        <h4>This is final form of evolution</h4>
      </div>
    )
  } else {
    return (
    <div className="pokemon-info-evolve">
    {evolveFormsJSX}
    </div>
    )
  }
}

export default PokemonDetails;