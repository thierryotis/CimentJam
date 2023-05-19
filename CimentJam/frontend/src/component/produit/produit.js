import axios from 'axios';
import { serverUrl } from '../../server';

export function getProduit(id) {
  return axios.get(`${serverUrl}/api/produit/getproduit/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getProduits() {
  return axios.get(`${serverUrl}/api/produit/getproduits`)
    .then(response => response.data.produits)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function updateProduit(id, data) {
  return axios.put(`${serverUrl}/api/produit/updateproduit/${id}`, data)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function deleteProduit(id) {
  return axios.delete(`${serverUrl}/api/produit/deleteproduit/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}
