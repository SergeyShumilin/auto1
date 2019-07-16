// ETA: 1 Hour
import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('<Header />', () => {
  afterEach(cleanup);

  it('should render <Logo />', () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(queryByTestId('logo')).not.toBeNull();
  });

  it('should render "My Orders" <Link to="/favorites" />', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(getByText('My Orders').getAttribute('href')).toMatch(/\/favorites$/);
  });
});
