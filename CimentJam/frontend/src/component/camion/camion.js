import axios from 'axios';
import { serverUrl } from '../../server';

export function getCamion(id) {
  return axios.get(`${serverUrl}/api/camion/getcamion/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getCamions() {
  return axios.get(`${serverUrl}/api/camion/getcamions`)
    .then(response => response.data.camions)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function updateCamion(id, data) {
  return axios.put(`${serverUrl}/api/camion/updatecamion/${id}`, data)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function deleteCamion(id) {
  return axios.delete(`${serverUrl}/api/camion/deletecamion/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}
