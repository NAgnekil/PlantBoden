import axios from 'axios';

export const fetchFlowers = () => {
  return axios
    .get('http://localhost:3000/api/plants')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching plants:', error);
      throw error;
    });
};
