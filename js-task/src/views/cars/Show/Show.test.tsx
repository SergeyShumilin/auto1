// ETA: 2 hours
import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '../../../mocks/api';
import { beautifyNumber } from '../../../utils';
import Show from './Show';

const props = { match: { params: { id: 1 } } };

describe('<Show />', () => {
  afterEach(cleanup);

  it('should redeirect to 404 if car is not found', async () => {
    const redirectUrl = '/404';
    const history = createMemoryHistory();
    const { findByText } = render(
      <Router history={history}>
        <Route
          path="/"
          exact={true}
          render={() => <Show match={{ params: { id: 2 } }} />}
        />
        <Route path={redirectUrl} render={() => <div>{redirectUrl}</div>} />
      </Router>
    );
    expect(await findByText(redirectUrl)).not.toBeNull();
  });

  it('should render car manufacturer name', async () => {
    const { findByText } = render(<Show {...props} />);
    expect(await findByText('BMW')).not.toBeNull();
  });

  it('should render car model name', async () => {
    const { findByText } = render(<Show {...props} />);
    expect(await findByText('X5')).not.toBeNull();
  });

  it('should render car stock number', async () => {
    const { findByText } = render(<Show {...props} />);
    expect(await findByText('Stock # 12345')).not.toBeNull();
  });

  it('should render car mileage', async () => {
    const { findByText } = render(<Show {...props} />);
    expect(await findByText(beautifyNumber(100500) + ' KM')).not.toBeNull();
  });

  it('should render car fule type', async () => {
    const { findByText } = render(<Show {...props} />);
    expect(await findByText('Petrol')).not.toBeNull();
  });

  it('should render car color', async () => {
    const { findByText } = render(<Show {...props} />);
    expect(await findByText('Black')).not.toBeNull();
  });

  it('should render "Save" favorites <Button />', () => {
    const { queryByText } = render(<Show {...props} />);
    expect(queryByText('Save')).not.toBeNull();
  });
});
