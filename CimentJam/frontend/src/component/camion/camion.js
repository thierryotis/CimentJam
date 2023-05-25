import axios from 'axios';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie';

const token = Cookies.get('jwt')

export function getCamion(id) {
  return axios.get(`${serverUrl}/api/camion/getcamion/${id}`, {
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getCamions() {
  return axios.get(`${serverUrl}/api/camion/getcamions`,{
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data.camions)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function updateCamion(id, data) {
  return axios.put(`${serverUrl}/api/camion/updatecamion/${id}`, data,{
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function deleteCamion(id) {
  return axios.delete(`${serverUrl}/api/camion/deletecamion/${id}`,{
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}
