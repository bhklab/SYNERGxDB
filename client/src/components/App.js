import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import '../styles/App.css';

import Home from './Home';

const App = () => (
  <Fragment>
    <Normalize />
    <div className="app">
      <header>
        <div className="wrapper" />
      </header>
      <main>
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </main>
      <footer>
        <div className="wrapper">
          <p>Copyright © 2019 BHKLab</p>
        </div>
      </footer>
    </div>
  </Fragment>
);

export default App;
