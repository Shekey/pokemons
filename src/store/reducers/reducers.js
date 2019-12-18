export default function(state={}, action) {
  switch(action.type){
      case 'GET_POKEMONS_ALL_SUCCESSFUL': 
      return {...state, allPokemons: action.payload, status: 'done'}
      case 'GET_POKEMON_BY_NAME': 
      return {...state, pokemon: action.payload, status: 'done'}
      case 'GET_POKEMONS_ALL_FAILED': 
      return {...state, allPokemons: action.payload, status: 'failed'}
    default:
      return state;
  }
}