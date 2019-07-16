import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
const colors = {
  colors: ['black']
};
const manufacturers = {
  manufacturers: [{ name: 'BMW' }]
};
mock.onGet('/api/colors').reply(200, colors);
mock.onGet('/api/manufacturers').reply(200, manufacturers);

const car = {
  car: {
    stockNumber: 12345,
    manufacturerName: 'BMW',
    modelName: 'X5',
    mileage: { number: '100500', unit: 'km' },
    color: 'black',
    fuelType: 'Petrol'
  }
};
mock.onGet('/api/cars/1').reply(200, car);

const cars = {
  cars: [
    {
      stockNumber: 12345,
      manufacturerName: 'BMW',
      modelName: 'X5',
      mileage: { number: '100500', unit: 'km' },
      color: 'black',
      fuelType: 'Petrol'
    },
    {
      stockNumber: 54321,
      manufacturerName: 'Mercedes',
      modelName: 'S600',
      mileage: { number: '100', unit: 'km' },
      color: 'white',
      fuelType: 'Diesel'
    }
  ],
  totalCarsCount: 100,
  totalPageCount: 10
};
mock.onGet('/api/cars?page=1').reply(200, cars);

export default mock;
