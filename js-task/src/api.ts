import axios from 'axios';
import { Filter, Car } from './types';

const delay = 0;

const process = (res: { data: {} }) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(res.data), delay);
  });
};

export const fetchCars = (page = 1, sort: string, filter: Filter) => {
  const options = [];

  options.push('page=' + page);

  if (sort) {
    options.push('sort=' + sort);
  }

  if (filter) {
    Object.keys(filter).forEach(item => {
      if (filter[item] !== '') {
        options.push(item + '=' + filter[item]);
      }
    });
  }

  const url = '/api/cars?' + options.join('&');

  return axios({ url }).then(process);
};

export const fetchColors = () => {
  return axios('/api/colors').then(process);
};

export const fetchManufacturers = () => {
  return axios('/api/manufacturers').then(process);
};

export const fetchCarByStockNumber = (id: number) => {
  return axios('/api/cars/' + id).then(process);
};

export const getFavourites = () => {
  return JSON.parse(localStorage.getItem('favourites') || '') || [];
};

export const setFavourites = (favourites: Car[]) => {
  localStorage.setItem('favourites', JSON.stringify(favourites));
};
