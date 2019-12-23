import axios from 'axios';
const GET_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';

export function getAllPokemons(offset = 0, limit = 9) {
  let GET_POKEMONS_ALL_URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
  let data = [];
  let counter = 0;

  return (dispatch) => {
    axios.get(GET_POKEMONS_ALL_URL)
      .then((res) => {
        data.firstPage = 1;
        data.countResults = res.data.count;
        data.lastPage = res.data.count / limit;
        data.lastPage % 1 !== 0 ? data.lastPage = parseInt(data.lastPage) + 1 : parseInt(data.lastPage);
        data.currentPage = offset / 9 === 0 ? 1 : offset / 9 + 1;
        data.nextNumber = data.currentPage === data.lastPage ? data.currentPage - 1 : data.currentPage + 1;
        data.doubleNextNumber = data.nextNumber + 1;
        data.nextPage = data.currentPage + 1;
        data.prevPage = data.currentPage > 1 ? data.currentPage - 1 : 1;
        if (data.nextPage > data.lastPage) {
          data.nextPage = data.lastPage;
          data.nextNumber = data.lastPage - 1;
          data.doubleNextNumber = data.currentPage;
          data.currentPage = data.prevPage - 1;
        } else if (data.nextPage === data.lastPage) {
          data.currentPage = data.prevPage - 1;
          data.nextPage = data.lastPage;
          data.nextNumber = data.lastPage - 2;
          data.doubleNextNumber = data.currentPage + 2;
        }
        return res.data;
      }).then((res) => {
        let length = res.results.length;
        res.results.forEach(element => {
          axios.get(element.url).then((res) => {
            data.push(res.data);
            counter++;
            if (counter === length) {
              return dispatch({
                type: 'GET_POKEMONS_ALL_SUCCESSFUL',
                payload: data
              })
            }
          })
        });

      }).catch(error => dispatch({
        type: 'GET_POKEMONS_ALL_FAILED',
        payload: error
      })
      );
  }
}

export function setCurrentPage(page) {
  return (dispatch) => {
    return dispatch({
      type: 'GET_CURRENT_PAGE',
      payload: page
    })
  }
}

export function getPokemon(id) {
  return (dispatch) => {

    axios.get(GET_POKEMON_URL + id)
      .then((res) => {
        res.isFinishedAsyncCall = false;
        res.data.evolveForms = [];
        function getSpecies() {
          return axios.get(res.data.species.url);
        }

        function getAbilities(abilities) {
          let array = [];
          abilities.forEach(item => {
            array.push(item.ability.url);
          })

          return array;
        }

        function getMoves(moves) {
          let array = [];
          moves.forEach(item => {
            array.push(item.move.url);
          })

          return array;
        }

        axios.all([getSpecies(), ...getAbilities(res.data.abilities).map((item) => axios.get(item)), ...getMoves(res.data.moves).map((item) => axios.get(item))])
          .then(axios.spread(function (...response) {
            // Both requests are now complete
            let counter = 0;
            let isDataPopulated = false;

            response.forEach(item => {
              if (!isDataPopulated) {
                if (item.data.color !== undefined) {
                  res.data.color = item.data.color.name;
                  res.data.evolutionUrl = item.data.evolution_chain.url;
                }

                if (item.data.capture_rate !== undefined) {
                  res.data.capture_rate = item.data.capture_rate;
                }

                if (item.data.habitat !== undefined) {
                  res.data.habitat = item.data.habitat.name;
                }

                if (item.data.effect_entries !== undefined) {
                  console.log(res.data);
                  res.data.abilities.map(i => {
                    if (i.ability.name === item.data.name) {
                      i.desc = item.data.effect_entries[0].effect;
                    }
                  });
                }

                if (item.data.accuracy !== undefined && item.data.accuracy !== null && item.data.power !== undefined && item.data.power !== null) {
                  res.data.moves.map(i => {
                    if (i.move.name === item.data.name && counter < 3) {
                      i.acc = item.data.accuracy;
                      i.pow = item.data.power;
                      counter++;
                    }
                    if (counter === 3) {
                      isDataPopulated = true;
                    }
                  });
                }
              } else if (res.data.evolutionUrl !== undefined) {
                let chain = true;
                let evolveForms = [];
                let counterOfFinishedCalls = 0;
                axios.get(res.data.evolutionUrl).then(respon => {
                  let startObject = respon.data.chain['evolves_to'][0];
                  while (chain) {
                    if (startObject !== undefined) {
                      evolveForms.push({
                        name: startObject.species.name,
                        url: startObject.species.url
                      })
                      startObject = startObject['evolves_to'][0];
                    } else {
                      chain = false;
                    }
                  }
                  evolveForms.forEach(i => {
                    if (!res.isFinishedAsyncCall) {
                      axios.get(`https://pokeapi.co/api/v2/pokemon/${i.name}`).then(res => {
                        counterOfFinishedCalls++;
                        return res.data;
                      }).then(response => {
                        res.data.evolveForms.push({
                          types: response.types,
                          name: response.name,
                          imageUrl: response.sprites.front_shiny,
                          id: response.id
                        })
                        if (counterOfFinishedCalls === evolveForms.length) {
                          res.isFinishedAsyncCall = true;
                          return dispatch({
                            type: 'GET_POKEMON_BY_NAME',
                            payload: res.data
                          })
                        }
                      })
                    }
                  });
                })
                if (isDataPopulated) {
                  res.data.evolutionUrl = undefined;
                }
              }
            });
          }));
      }).catch(error => dispatch({
        type: 'GET_POKEMONS_ALL_FAILED',
        payload: error
      })
      );
  }
}

export function clearPokemonDetails() {
  return {
    type: 'CLEAR_POKEMON_DETAILS',
    payload: null
  }
}

export function toggleFavorites(id) {
  return (dispatch) => {
    ;
    return dispatch({
      type: 'TOGGLE_FAVORITES',
      id
    })
  }
}
