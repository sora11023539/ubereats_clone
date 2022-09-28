import axios from 'axios';
import { foodsIndex } from '../urls/index';

export function fetchFoods(restaurantId) {
  return axios.get(foodsIndex(restaurantId))
    .then(res => {
      return res.data;
    })
    .catch((e) => console.error(e));
}
