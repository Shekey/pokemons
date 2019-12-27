let initialState = {
  favorites: []
}
export default function(state=initialState, action) {
  switch(action.type){
      case 'GET_POKEMONS_ALL_SUCCESSFUL': 
      return {...state, allPokemons: action.payload, isAppStarted: true}
      case 'GET_POKEMON_BY_NAME': 
      return {...state, pokemon: action.payload, isAppStarted: true}
      case 'CLEAR_POKEMON_DETAILS':
      return {...state,pokemon: action.payload}
      case 'GET_CURRENT_PAGE':
      return {...state,currentPage: action.payload}
      case 'GET_ALL_TYPES':
      return {...state,pokeTypes: action.payload}
      case 'SAVE_POKEMON_DETAILS':
      let allPokemonsSaved = [];
      let prevPokemonSaved = {...state.savedPokemonsDetails}[0];
      if(prevPokemonSaved) {
        allPokemonsSaved = [...state.savedPokemonsDetails]
      }
      let exist = allPokemonsSaved.find(i=> i.id === action.payload.id);
      if(exist === undefined) {
        allPokemonsSaved.push(action.payload);
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
      }
      return {...state, savedPokemonsList: allPokemonItems}
      case 'TOGGLE_FAVORITES':
      let isFavorite = state.favorites.find(i => i.id === action.id);
      if(isFavorite === undefined) {
        let favoritePokemons = JSON.parse(window.localStorage.getItem('favoritePokemons'));
        let favorites = [...favoritePokemons, { id: action.id, name: action.name}];
        state.favorites = favorites;
        if (typeof(Storage) !== "undefined") {
          window.localStorage.setItem('favoritePokemons', JSON.stringify(state.favorites));
        }
        return {...state };
      } else {
        const filteredItems = state.favorites.filter(item => item.id !== action.id);
        state.favorites = filteredItems;
        if (typeof(Storage) !== "undefined") {
          window.localStorage.setItem('favoritePokemons', JSON.stringify(state.favorites));
        }
        return {...state };
      }
      case 'GET_POKEMONS_ALL_FAILED': 
      return {...state, allPokemons: action.payload, status: 'failed'}
    default:
      return state;
  }
}