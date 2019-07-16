// ETA: 2 hours
import * as React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '../../../mocks/api';
import NavFilter from './NavFilter';

describe('<NavFilter />', () => {
  afterEach(cleanup);

  it('should render "Color" <Label />', () => {
    const { queryByText } = render(<NavFilter />);
    expect(queryByText('Color')).toBeTruthy();
  });

  it('should render colors <Select />', () => {
    const { queryByLabelText } = render(<NavFilter />);
    expect(queryByLabelText('Color')).toBeTruthy();
  });

  it('should render "Manufacturer" <Label />', () => {
    const { queryByText } = render(<NavFilter />);
    expect(queryByText('Manufacturer')).toBeTruthy();
  });

  it('should render manufacturers <Select />', () => {
    const { queryByLabelText } = render(<NavFilter />);
    expect(queryByLabelText('Manufacturer')).toBeTruthy();
  });

  it('should render "Filter" <Button />', () => {
    const { queryByText } = render(<NavFilter />);
    expect(queryByText('Filter')).toBeTruthy();
  });

  it('should change address bar to selected values on "Filter" press', async () => {
    const history = {
      url: '',
      push: function(url: string) {
        this.url = url;
      }
    };
    const { getByText, getByLabelText, findByText } = render(
      <NavFilter history={history} />
    );
    const filter = getByText('Filter');
    const colorSelect = getByLabelText('Color');
    const manufacturerSelect = getByLabelText('Manufacturer');
    await findByText('Black');
    fireEvent.change(colorSelect, { target: { value: 'black' } });
    fireEvent.change(manufacturerSelect, { target: { value: 'BMW' } });
    fireEvent.click(filter);
    expect(history.url).toBe('/?color=black&manufacturer=BMW');
    fireEvent.change(manufacturerSelect, { target: { value: '' } });
    fireEvent.click(filter);
    expect(history.url).toBe('/?color=black&manufacturer=');
    fireEvent.change(colorSelect, { target: { value: '' } });
    fireEvent.change(manufacturerSelect, { target: { value: 'BMW' } });
    fireEvent.click(filter);
    expect(history.url).toBe('/?color=&manufacturer=BMW');
    fireEvent.change(colorSelect, { target: { value: '' } });
    fireEvent.change(manufacturerSelect, { target: { value: '' } });
    fireEvent.click(filter);
    expect(history.url).toBe('/?color=&manufacturer=');
    /* Valid combinations:
     ?color=black&manufacturer=BMW
     ?color=black&manufacturer=
     ?color=&manufacturer=BMW
     ?color=&manufacturer=
     ?color=black
     ?manufacturer=BMW
     ?color=
     ?manufacturer=
     ?
    */
  });
});
