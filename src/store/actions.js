import axios from 'axios';
const GET_POKEMONS_ALL_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=8';
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
            console.log(counter);
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

        function getSpecies() {
          return axios.get(res.data.species.url);
        }

        function getAbilities(abilities) {
          let array = [];
          console.log(abilities)
          abilities.map(item => {
            array.push(item.ability.url);
          })

          return array;
        }

        function getMoves(moves) {
          let array = [];
          moves.map(item => {
            array.push(item.move.url);
          })

          return array;
        }

        axios.all([getSpecies(), ...getAbilities(res.data.abilities).map((item) => axios.get(item)),
        ...getMoves(res.data.moves).map((item) => axios.get(item))])
          .then(axios.spread(function (...response) {
            // Both requests are now complete

            let counter = 0;

            response.map(item => {
              if (item.data.color !== undefined) {
                res.data.color = item.data.color.name;
              }

              if (item.data.capture_rate !== undefined) {
                res.data.capture_rate = item.data.capture_rate;
              }

              if (item.data.habitat !== undefined) {
                res.data.habitat = item.data.habitat.name;
              }

              if (item.data.effect_entries !== undefined) {
                res.data.abilities.map(i => {
                  if(i.ability.name === item.data.name) {
                    i.desc = item.data.effect_entries[0].effect;
                  }
                });
              }
              
              if (item.data.accuracy !== undefined && item.data.accuracy !== null && item.data.power !== undefined && item.data.power !== null) {
                res.data.moves.map(i => {
                  if(i.move.name === item.data.name && counter < 4) {
                    i.acc = item.data.accuracy;
                    i.pow = item.data.power;
                    counter++;
                  }
                });
              }
            });


            return dispatch({
              type: 'GET_POKEMON_BY_NAME',
              payload: res.data
            })
          }));
      }).catch(error => dispatch({
        type: 'GET_POKEMONS_ALL_FAILED',
        payload: error
      })
      );
  }
}
