import axios from 'axios';
import { serverUrl } from '../../server';

export function getDechargement(id) {
  return axios.get(`${serverUrl}/api/dechargement/getdechargement/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getDechargements() {
  return axios.get(`${serverUrl}/api/dechargement/getdechargements`)
    .then(response => response.data.dechargements)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function updateDechargement(id, data) {
  return axios.put(`${serverUrl}/api/dechargement/updatedechargement/${id}`, data)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function deleteDechargement(id) {
  return axios.delete(`${serverUrl}/api/dechargement/deletedechargement/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}
