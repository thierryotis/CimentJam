import axios from 'axios';
import { serverUrl } from '../../server';

export function getCurrentUserRole() {
  {/*return axios.get(`${serverUrl}/api/chargement/getchargement/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });*/}
    return ("admin"); //setting it static to check
}