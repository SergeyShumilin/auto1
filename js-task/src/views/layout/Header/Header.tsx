import * as React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../../components';
import { toggleSticky } from '../../../utils';

export default class Header extends React.PureComponent {
  container: React.RefObject<HTMLInputElement> = React.createRef();

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const { current } = this.container;

    if (current) {
      toggleSticky(current);
    }
  };

  render() {
    return (
      <header data-testid="header" ref={this.container}>
        <Link to="/">
          <Logo />
        </Link>
        <nav className="font-r2">
          <Link className="link" to="/purchase">
            Purchase
          </Link>
          <Link className="link" to="/favorites">
            My Orders
          </Link>
          <Link className="link" to="/sell">
            Sell
          </Link>
        </nav>
      </header>
    );
  }
}
