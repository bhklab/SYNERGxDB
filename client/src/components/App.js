import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import '../styles/App.css';

import Home from './Home';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    )
    return (
      <div className='app'>
        <header>
          <div className='wrapper'>
          </div>
        </header>
        <main>
          <div className='wrapper'>
            <Switch>
              <App />
            </Switch>
          </div>
        </main>
        <footer>
          <div className='wrapper'>
            <p>Copyright © 2019 BHKLab</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
