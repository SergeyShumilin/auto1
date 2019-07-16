import * as React from 'react';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

export default () => (
  <div className="error-404">
    <Logo />
    <h1 className="font-b1">404 - Not Found</h1>
    <div className="font-r1">
      Sorry, the page you are looking for does not exist.
    </div>
    <div className="font-r1">
      You can always go back to the{' '}
      <Link className="link" to="/">
        homepage
      </Link>
      .
    </div>
  </div>
);
