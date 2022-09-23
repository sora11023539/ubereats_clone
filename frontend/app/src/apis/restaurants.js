import { axios } from "axios";
import { restaurantsIndex } from "../urls/index";

export const fetchRestaurants = () => {
  // axios.get = Throw HTTP request
  return axios.get(restaurantsIndex)
  // Success
  .then(res => {
    return res.data
  })
  // Failed
  .catch((e) => console.error(e))
}
