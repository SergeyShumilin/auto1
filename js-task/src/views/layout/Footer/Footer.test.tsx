// ETA: 30 minutes
import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import Footer from './Footer';

describe('<Footer />', () => {
  afterEach(cleanup);

  it('should render "© Auto1 Group 2019"', () => {
    const { queryByText } = render(<Footer />);
    expect(queryByText('© AUTO1 Group 2019')).toBeTruthy();
  });
});
