import axios from 'axios';
import { func } from 'prop-types';
const GET_POKEMONS_ALL_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=9';
const GET_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';

export function getAllPokemons() {
  let data = [];
  let counter = 0;
  return (dispatch) => {
    axios.get(GET_POKEMONS_ALL_URL)
      .then((res) => {
        return res.data.results;
      }).then((res) => {
        let length = res.length;
        res.forEach(element => {
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
                  res.data.abilities.map(i => {
                    if (i.ability.name === item.data.name) {
                      i.desc = item.data.effect_entries[0].effect;
                    }
                  });
                }

                if (item.data.accuracy !== undefined && item.data.accuracy !== null && item.data.power !== undefined && item.data.power !== null) {
                  res.data.moves.forEach(i => {
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
                axios.get(res.data.evolutionUrl).then( respon => {
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
                if(isDataPopulated) {
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
  return (dispatch) => {;
    console.log(id);
    return dispatch({
      type: 'TOGGLE_FAVORITES'
    })
  }
}
