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
      let prevPokemonSaved = {...state.savedPokemonsDetails}[0];
      if(prevPokemonSaved) {
        allPokemonsSaved = [...state.savedPokemonsDetails]
      }
      let exist = allPokemonsSaved.find(i=> i.id === action.payload.id);
      if(exist === undefined) {
        allPokemonsSaved.push(action.payload);
        console.log('save pokemons details');
      }
      return {...state, savedPokemonsDetails: allPokemonsSaved}
      case 'SAVE_POKEMONS_LIST':
      let allPokemonItems = [];
      let prevPokemonItem = {...state.savedPokemonsList}[0];
      if(prevPokemonItem) {
        allPokemonItems = [...state.savedPokemonsList]
      }
      let existPokemonItem = allPokemonItems.find(i=> i.currentPage === action.payload[0].currentPage);
      if(existPokemonItem === undefined) {
        allPokemonItems.push(action.payload);
        console.log('saved pokemon item');
      }
      return {...state, savedPokemonsList: allPokemonItems}
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