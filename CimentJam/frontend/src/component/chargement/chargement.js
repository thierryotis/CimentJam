import axios from 'axios';
import { serverUrl } from '../../server';

export function getChargement(id) {
  return axios.get(`${serverUrl}/api/chargement/getchargement/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getChargements() {
  return axios.get(`${serverUrl}/api/chargement/getchargements`)
    .then(response => response.data.chargements)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function updateChargement(id, data) {
  return axios.put(`${serverUrl}/api/chargement/updatechargement/${id}`, data)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function deleteChargement(id) {
  return axios.delete(`${serverUrl}/api/chargement/deletechargement/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}
