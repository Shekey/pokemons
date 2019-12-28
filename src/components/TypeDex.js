import React from 'react'

const TypeDex = (props) => {

  return (
    <div className="content row all-types-list">
      {
        props.pokeTypes && props.pokeTypes.length > 0 ?
          props.pokeTypes.sort((a, b) => (a.name > b.name) ? 1 : -1).map(item => {
            return (<div key={item.name} className={`pokemon_item ${item.name}`} onClick={() =>props.handleClick(item.name)}>
              <div className={`pokemon_type_item`}>{item.name}</div>
            </div>
            )
          })
          : null
      }
    </div>
  )
}

export default TypeDex;
