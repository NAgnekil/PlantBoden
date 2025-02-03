import axios from 'axios'

export const fetchFlowers = () => {
  return axios
    .get('../database.json')
    .then((response) => {
      return response.data.flowers
    })
    .catch((error) => {
      console.error('Error fetching flowers:', error)
      throw error
    })
}
