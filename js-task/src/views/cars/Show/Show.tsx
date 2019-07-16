import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from '../../../components';
import {
  fetchCarByStockNumber,
  getFavourites,
  setFavourites
} from '../../../api';
import { getCarInfoItems } from '../../../utils';
import { Car } from '../../../types';

interface Props {
  match: { params: { id: number } };
}

interface State {
  car: Car;
  isNotFound: boolean;
  isSaved: boolean;
}

export default class Show extends React.PureComponent<Props, State> {
  _isMounted = false;
  state = {
    car: {
      stockNumber: 0,
      modelName: '',
      manufacturerName: '',
      mileage: { number: 0, unit: '' },
      color: '',
      fuelType: ''
    },
    isNotFound: false,
    isSaved: false
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    this._isMounted = true;

    fetchCarByStockNumber(params.id)
      .then(({ car }) => {
        const favourites = getFavourites();

        if (this._isMounted) {
          this.setState({
            car,
            isSaved: !!(
              favourites &&
              favourites.find(
                (item: Car) => item.stockNumber === car.stockNumber
              )
            )
          });
        }
      })
      .catch(e => {
        this.setState({ isNotFound: true });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  save = () => {
    const favourites = getFavourites();
    const { car } = this.state;
    setFavourites([...favourites, car]);
    this.setState({ isSaved: true });
  };

  remove = () => {
    const favourites = getFavourites();
    const {
      car: { stockNumber }
    } = this.state;
    setFavourites(
      favourites.filter((item: Car) => item.stockNumber !== stockNumber)
    );
    this.setState({ isSaved: false });
  };

  render() {
    const { car, isNotFound, isSaved } = this.state;
    const infoItems = car ? getCarInfoItems(car) : [];

    if (isNotFound || !car) {
      return <Redirect to="/404" />;
    }

    return (
      <div className="cars-show">
        <div className="cars-show-image" />
        <div className="cars-show-content">
          <div className="main-panel">
            <h1 className="font-b1">
              <span>{car.manufacturerName}</span> <span>{car.modelName}</span>
            </h1>
            <div className="font-r1">
              {infoItems.map((item, key) => (
                <React.Fragment key={'info-' + key}>
                  <span>{item}</span>
                  {key + 1 < infoItems.length ? ' - ' : ''}
                </React.Fragment>
              ))}
            </div>
            <div className="font-r2">
              This car is currently available and can be delivered as soon as
              tomorrow morning. Please be aware that delivery times shown in
              this page are not definitive and may change due to bad weather
              conditions.
            </div>
          </div>
          {car && (
            <div className="save-panel">
              <div className="save-form">
                <div className="text font-r2">
                  If you like this car, click the button and save it in your
                  collection of favourite items.
                </div>
                {!isSaved ? (
                  <Button label="Save" onClick={this.save} />
                ) : (
                  <Button label="Remove" onClick={this.remove} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
