import { Car } from './types';

export const getCarName = ({ manufacturerName, modelName }: Car) => {
  return manufacturerName + ' ' + modelName;
};

export const getCarInfoItems = ({
  stockNumber,
  mileage,
  fuelType,
  color
}: Car) => {
  const items = [];

  items.push('Stock # ' + stockNumber);

  if (mileage) {
    items.push(
      beautifyNumber(mileage.number) + ' ' + mileage.unit.toUpperCase()
    );
  }

  items.push(fuelType);

  if (color) {
    items.push(color.charAt(0).toUpperCase() + color.slice(1));
  }

  return items;
};

export const beautifyNumber = (number: number) => {
  return new Intl.NumberFormat().format(number);
};

export const toggleSticky = (element: HTMLElement, offset = 0) => {
  if (window.pageYOffset > element.offsetTop - offset) {
    element.classList.add('sticky');
  } else {
    element.classList.remove('sticky');
  }
};
