// ETA: 2-3 hours
import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '../../../mocks/api';
import Index from './Index';
import { setFavourites } from '../../../api';
import { beautifyNumber } from '../../../utils';

const props = { location: { search: '' } };

describe('<Index />', () => {
  afterEach(cleanup);

  it('should not render Welcome!', () => {
    const { container } = render(<Index {...props} />);
    expect(container.innerHTML).not.toContain('Welcome!');
  });

  it('should render <NavFilter />', () => {
    const { queryByTestId } = render(<Index {...props} />);
    expect(queryByTestId('nav-filter')).not.toBeNull();
  });

  it('should render sort <Select /> by mileage', () => {
    const { queryByTestId } = render(<Index {...props} />);
    expect(queryByTestId('sort-select')).not.toBeNull();
  });

  it('should render "10 of 100 results"', async () => {
    const { queryByTestId, findByText } = render(
      <BrowserRouter>
        <Index {...props} />
      </BrowserRouter>
    );
    expect(queryByTestId('results-text')).not.toBeNull();
    expect(await findByText('Showing 2 of 100 results')).not.toBeNull();
  });

  it('should render <List /> of cars', () => {
    const { queryByTestId } = render(<Index {...props} />);
    expect(queryByTestId('cars-list')).not.toBeNull();
  });

  it('should render favorite cars first', async () => {
    setFavourites([{ stockNumber: 54321 }]);
    const { findAllByTestId } = render(
      <BrowserRouter>
        <Index {...props} />
      </BrowserRouter>
    );
    const cars = await findAllByTestId('cars-list-item');
    expect(cars).toHaveLength(2);
    expect(cars[0].innerHTML).toContain('# 54321');
    setFavourites([]);
  });

  it('should render cars manufacturer and model name', async () => {
    const { findAllByTestId } = render(
      <BrowserRouter>
        <Index {...props} />
      </BrowserRouter>
    );
    const cars = await findAllByTestId('cars-list-item');
    expect(cars).toHaveLength(2);
    expect(cars[0].innerHTML).toContain('BMW');
    expect(cars[0].innerHTML).toContain('X5');
  });

  it('should render cars stock number, mileage, fuel type and color', async () => {
    const { findAllByTestId } = render(
      <BrowserRouter>
        <Index {...props} />
      </BrowserRouter>
    );
    const cars = await findAllByTestId('cars-list-item');
    expect(cars).toHaveLength(2);
    const car = cars[0].innerHTML;
    expect(car).toContain('# 12345');
    expect(car).toContain(beautifyNumber(100500) + ' KM');
    expect(car).toContain('Petrol');
    expect(car).toContain('Black');
  });

  it('when click on "View details" should navigate to show car page', async () => {
    const redirectUrl = '/cars/12345';
    const history = createMemoryHistory();
    const { findAllByTestId, findByText } = render(
      <Router history={history}>
        <Route path="/" exact={true} render={() => <Index {...props} />} />
        <Route path={redirectUrl} render={() => <div>{redirectUrl}</div>} />
      </Router>
    );
    const detailsLinks = await findAllByTestId('details-link');
    expect(detailsLinks).toHaveLength(2);
    fireEvent.click(detailsLinks[0]);
    expect(await findByText(redirectUrl)).not.toBeNull();
  });
});
