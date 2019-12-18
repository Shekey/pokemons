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
        axios.get(res.data.species.url).then((res2) => {
          res.data.color = res2.data.color.name;
          res.data.capture_rate = res2.data.capture_rate;
          res.data.habitat = res2.data.habitat.name;
          return res
        }).then((res3) => {
          let finishedAbilities = false;
          let finishedMoves = false;

          res3.data.abilities.map((item, index) => {
            axios.get(item.ability.url).then((res2) => {
              res3.data.abilities[index].desc = res2.data.effect_entries[0].effect;
              if (index === res3.data.abilities.length - 1) {
                finishedAbilities = true;
              }
            })
          })

          let counterMoves = 0;
          res3.data.moves.map((item, index) => {
            axios.get(item.move.url).then((response) => {
              if(response.data.accuracy !== null && response.data.power !== null && counterMoves <4) {
                res3.data.moves[index].acc = response.data.accuracy;
                res3.data.moves[index].pow = response.data.power;
                counterMoves++;
              }

              if (counterMoves === 4) {
                finishedMoves = true;
                return res3;
              }
            }).then( (res) => {
              if (finishedMoves && finishedAbilities) {
                return dispatch({
                  type: 'GET_POKEMON_BY_NAME',
                  payload: res.data
                })
              }
            })
          })
        })
      }).catch(error => dispatch({
        type: 'GET_POKEMONS_ALL_FAILED',
        payload: error
      })
      );
  }
}
