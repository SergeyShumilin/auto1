import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('<App />', () => {
  afterEach(cleanup);

  it('should render <Header />', () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(queryByTestId('header')).not.toBeNull();
  });

  it('should render <Footer /> at the bottom', () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(queryByTestId('footer')).not.toBeNull();
  });

  describe('should stick elements on scroll or resize', () => {
    it('should stick <Header /> always on top', () => {
      const { getByTestId } = render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      const header = getByTestId('header');
      expect(header.classList.contains('sticky')).toBe(false);
      Object.defineProperty(window, 'pageYOffset', {
        value: 10,
        writable: true
      });
      fireEvent.scroll(window);
      expect(header.classList.contains('sticky')).toBe(true);
    });

    it('should stick <FilterNav /> always on left top side', () => {
      const { getByTestId } = render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
      const filter = getByTestId('nav-filter');
      expect(filter.classList.contains('sticky')).toBe(false);
      Object.defineProperty(window, 'pageYOffset', {
        value: 10,
        writable: true
      });
      fireEvent.scroll(window);
      expect(filter.classList.contains('sticky')).toBe(true);
    });
  });
});
