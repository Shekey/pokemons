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
      console.log('currentPage');
      console.log(action.payload);
      return {...state,currentPage: action.payload}
      case 'TOGGLE_FAVORITES':
      let isFavorite = state.favorites.find(i => i === action.id);
      if(isFavorite === undefined) {
        let favorites = [...state.favorites, action.id];
        state.favorites = favorites;
        console.log(state.favorites);

        return {...state };
      } else {
        const filteredItems = state.favorites.filter(item => item !== action.id);
        state.favorites = filteredItems;
        console.log(state);
        return {...state };
      }
      case 'GET_POKEMONS_ALL_FAILED': 
      return {...state, allPokemons: action.payload, status: 'failed'}
    default:
      return state;
  }
}