// ETA: 1-2 hours
import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import Pagination from './Pagination';

const props = { current: 1, total: 10 };

describe('<Pagination />', () => {
  afterEach(cleanup);

  it('should render "First" page link', () => {
    const { queryByText } = render(<Pagination {...props} />);
    expect(queryByText('First')).toBeTruthy();
  });

  it('should render "Previous" page link', () => {
    const { queryByText } = render(<Pagination {...props} />);
    expect(queryByText('Previous')).toBeTruthy();
  });

  it('should render "Page 2 of 10"', () => {
    const { queryByText } = render(<Pagination {...props} current={2} />);
    expect(queryByText('Page 2 of 10')).toBeTruthy();
  });

  it('should render "Next" page link', () => {
    const { queryByText } = render(<Pagination {...props} current={2} />);
    expect(queryByText('Next')).toBeTruthy();
  });

  it('should render "Last" page link', () => {
    const { queryByText } = render(<Pagination {...props} current={2} />);
    expect(queryByText('Last')).toBeTruthy();
  });

  describe('on first page', () => {
    it('should disable "First" page link', () => {
      const { getByText } = render(<Pagination {...props} />);
      expect(getByText('First').classList.contains('disabled')).toBe(true);
    });

    it('should disable "Previous" page link', () => {
      const { getByText } = render(<Pagination {...props} />);
      expect(getByText('Previous').classList.contains('disabled')).toBe(true);
    });

    it('should enable "Next" page link', () => {
      const { getByText } = render(<Pagination {...props} />);
      expect(getByText('Next').classList.contains('disabled')).toBe(false);
    });
  });

  describe('on not last page and not first page', () => {
    it('should enable "First" page link', () => {
      const { getByText } = render(<Pagination {...props} current={2} />);
      expect(getByText('First').classList.contains('disabled')).toBe(false);
    });

    it('should enable "Previous" page link', () => {
      const { getByText } = render(<Pagination {...props} current={2} />);
      expect(getByText('Previous').classList.contains('disabled')).toBe(false);
    });

    it('should enable "Next" page link', () => {
      const { getByText } = render(<Pagination {...props} current={2} />);
      expect(getByText('Next').classList.contains('disabled')).toBe(false);
    });

    it('should enable "Last" page link', () => {
      const { getByText } = render(<Pagination {...props} current={2} />);
      expect(getByText('Last').classList.contains('disabled')).toBe(false);
    });
  });

  describe('on last page', () => {
    it('should disable "Next" page link', () => {
      const { getByText } = render(<Pagination {...props} current={10} />);
      expect(getByText('Next').classList.contains('disabled')).toBe(true);
    });

    it('should disable "Last" page link', () => {
      const { getByText } = render(<Pagination {...props} current={10} />);
      expect(getByText('Last').classList.contains('disabled')).toBe(true);
    });
  });
});
