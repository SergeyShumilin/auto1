import * as React from 'react';
import * as queryString from 'query-string';
import { List, NavFilter } from '../../layout';
import { fetchCars, getFavourites } from '../../../api';
import { getCarName, getCarInfoItems } from '../../../utils';
import { Car, Event, Filter, History } from '../../../types';

interface CarsData {
  cars: Car[];
  totalCarsCount: number;
  totalPageCount: number;
}

interface Props {
  location: { search: string };
  history?: History;
}

interface State {
  cars: CarsData;
  loading: boolean;
  page: number;
  sort: string;
  filter: Filter;
}

export default class Index extends React.PureComponent<Props, State> {
  _isMounted = false;

  constructor(props: Props) {
    super(props);
    const params = this.getQueryParams(props);
    this.state = {
      cars: {
        cars: [],
        totalCarsCount: 0,
        totalPageCount: 0
      },
      loading: true,
      ...params
    };
  }

  componentDidMount() {
    const { page, sort, filter } = this.state;

    this._isMounted = true;

    fetchCars(page, sort, filter).then((cars: CarsData) => {
      if (this._isMounted) {
        this.moveFavouritesToTop(cars.cars);
        this.setState({ cars, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  moveFavouritesToTop = (cars: Car[]) => {
    const favourites: Car[] = getFavourites();

    if (cars && cars.length && favourites.length) {
      const favouritesIndex = favourites.map(({ stockNumber }) => stockNumber);
      cars.sort((a, b) => {
        if (favouritesIndex.includes(a.stockNumber)) {
          return -1;
        } else if (favouritesIndex.includes(b.stockNumber)) {
          return 1;
        }
        return 0;
      });
    }
  };

  getQueryParams = (props: Props) => {
    const {
      location: { search }
    } = props;
    const { page, sort, ...filter } = queryString.parse(search);

    return {
      page: Number(page) || 1,
      sort: sort ? String(sort) : '',
      filter: filter
    };
  };

  getListItems = () => {
    const {
      cars: { cars }
    } = this.state;
    return cars.map(item => ({
      id: item.stockNumber,
      name: getCarName(item),
      info: getCarInfoItems(item).join(' - ')
    }));
  };

  getCars = () => {
    const { page, sort, filter } = this.state;

    fetchCars(page, sort, filter).then((cars: CarsData) => {
      if (this._isMounted) {
        this.moveFavouritesToTop(cars.cars);
        this.setState({ cars, loading: false });
      }
    });
  };

  handlePageChange = (page: number) => {
    this.setState({ page, loading: true }, this.getCars);
  };

  handleSortChange = (event: Event) => {
    const sort = event.target.value;
    this.setState({ sort, page: 1, loading: true }, this.getCars);
  };

  handleFilterChange = (filter: Filter) => {
    this.setState({ filter, page: 1, loading: true }, this.getCars);
  };

  render() {
    const { history } = this.props;
    const {
      cars: { totalCarsCount, totalPageCount },
      page,
      sort,
      filter,
      loading
    } = this.state;

    return (
      <div className="cars-index">
        <NavFilter
          onSubmit={this.handleFilterChange}
          history={history}
          value={filter}
        />
        <div className="list-panel">
          <List
            items={this.getListItems()}
            totalItemsCount={totalCarsCount}
            totalPagesCount={totalPageCount}
            page={page}
            sort={sort}
            onPageChange={this.handlePageChange}
            onSortChange={this.handleSortChange}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}
