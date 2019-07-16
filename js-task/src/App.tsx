import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Footer } from './views/layout';
import { Index, Show } from './views/cars';
import Error404 from './views/404';
import './styles.scss';

export default () => (
  <div className="main-container">
    <Header />
    <main data-testid="main">
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/cars/:id" component={Show} />
        <Route component={Error404} />
      </Switch>
    </main>
    <Footer />
  </div>
);
