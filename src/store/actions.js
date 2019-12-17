import axios from 'axios';
const GET_POKEMONS_ALL_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=8';

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
