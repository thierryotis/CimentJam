import axios from 'axios';
import { serverUrl } from '../../server';

export function getChauffeur(id) {
  return axios.get(`${serverUrl}/api/chauffeur/getchauffeur/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getChauffeurs() {
  return axios.get(`${serverUrl}/api/chauffeur/getchauffeurs`)
    .then(response => response.data.chauffeurs)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function updateChauffeur(id, data) {
  return axios.put(`${serverUrl}/api/chauffeur/updatechauffeur/${id}`, data)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function deleteChauffeur(id) {
  return axios.delete(`${serverUrl}/api/chauffeur/deletechauffeur/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}
