import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Me from './Me.js';
import Report from './Report.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li><Link to="/">Me</Link></li>
              <li><Link to="/reports/week/1">kmom01</Link></li>
            </ul>
          </nav>
          <Route exact path="/" component={Me} />
          <Route path="/reports/week/:week" component={Report} />
          <footer></footer>
        </div>

      </Router>

    );
  }
}

export default App;
