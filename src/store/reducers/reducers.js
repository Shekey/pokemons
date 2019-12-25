let initialState = {
  favorites: []
}
export default function(state=initialState, action) {
  switch(action.type){
      case 'GET_POKEMONS_ALL_SUCCESSFUL': 
      return {...state, allPokemons: action.payload, status: 'done'}
      case 'GET_POKEMON_BY_NAME': 
      return {...state, pokemon: action.payload, status: 'done'}
      case 'CLEAR_POKEMON_DETAILS':
      return {...state,pokemon: action.payload}
      case 'GET_CURRENT_PAGE':
      return {...state,currentPage: action.payload}
      case 'SAVE_POKEMON_DETAILS':
      let allPokemonsSaved = [];
      let prevPokemonSaved = {...state.savedPokemons}[0];
      if(prevPokemonSaved) {
        allPokemonsSaved = [...state.savedPokemons]
      }
      let exist = allPokemonsSaved.find(i=> i.id === action.payload.id);
      if(exist === undefined) {
        allPokemonsSaved.push(action.payload);
        console.log('save pokemons details');
      }
      return {...state, savedPokemons: allPokemonsSaved}
      case 'TOGGLE_FAVORITES':
      let isFavorite = state.favorites.find(i => i === action.id);
      if(isFavorite === undefined) {
        let favorites = [...state.favorites, action.id];
        state.favorites = favorites;
        return {...state };
      } else {
        const filteredItems = state.favorites.filter(item => item !== action.id);
        state.favorites = filteredItems;
        return {...state };
      }
      case 'GET_POKEMONS_ALL_FAILED': 
      return {...state, allPokemons: action.payload, status: 'failed'}
    default:
      return state;
  }
}