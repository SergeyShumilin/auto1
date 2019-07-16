import * as React from 'react';
import { Select, Button } from '../../../components';
import { fetchColors, fetchManufacturers } from '../../../api';
import { toggleSticky } from '../../../utils';
import { Option, Event, History, Filter } from '../../../types';

interface Props {
  onSubmit(value: Filter): void;
  value: Filter;
  history?: History;
}

interface State {
  colors: Option[];
  manufacturers: Option[];
  value: Filter;
}

export default class NavFilter extends React.PureComponent<Props, State> {
  container: React.RefObject<HTMLInputElement> = React.createRef();
  _isMounted = false;

  state = {
    colors: [{ label: 'All car colors', value: '' }],
    manufacturers: [{ label: 'All manufacturers', value: '' }],
    value: {}
  };

  static defaultProps = {
    onSubmit: () => null,
    value: {}
  };

  componentDidMount() {
    const { value } = this.props;

    this._isMounted = true;

    Promise.all([fetchColors(), fetchManufacturers()]).then(
      ([{ colors }, { manufacturers }]) => {
        if (this._isMounted) {
          this.setState({
            colors: [
              ...this.state.colors,
              ...colors.map((color: string) => ({
                label: color.charAt(0).toUpperCase() + color.slice(1),
                value: color
              }))
            ],
            manufacturers: [
              ...this.state.manufacturers,
              ...manufacturers.map(({ name }: { name: string }) => ({
                label: name,
                value: name
              }))
            ],
            value
          });
        }
      }
    );

    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const { current } = this.container;

    if (current) {
      toggleSticky(current, 80);
    }
  };

  handleColorChange = (event: Event) => {
    const { value } = this.state;
    const color = event.target.value;
    this.setState({ value: { ...value, color } });
  };

  handleManufacturerChange = (event: Event) => {
    const { value } = this.state;
    const manufacturer = event.target.value;
    this.setState({ value: { ...value, manufacturer } });
  };

  handleSubmit = () => {
    const { onSubmit, history } = this.props;
    const { value } = this.state;

    if (history) {
      history.push(
        '/?' +
          Object.keys(value)
            .map(key => key + '=' + value[key])
            .join('&')
      );
    }
    onSubmit(value);
  };

  render() {
    const {
      colors,
      manufacturers,
      value: { color, manufacturer }
    } = this.state;

    return (
      <div className="nav-filter" data-testid="nav-filter" ref={this.container}>
        <Select
          id="color"
          label="Color"
          value={color}
          options={colors}
          onChange={this.handleColorChange}
        />
        <Select
          id="manufacturer"
          label="Manufacturer"
          value={manufacturer}
          options={manufacturers}
          onChange={this.handleManufacturerChange}
        />
        <Button label="Filter" onClick={this.handleSubmit} />
      </div>
    );
  }
}
