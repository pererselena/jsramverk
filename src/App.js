import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Me from './components/Me.js';
import Report from './components/Report.js';

import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header>
                        <div className="header-content">
                            <section className="flash">
                                <h1>JSRamverk</h1>
                            </section>
                            <nav>
                                <Link to="/">Me</Link>
                                <Link to="/reports/week/1">Kmom01</Link>
                            </nav>
                        </div>
                    </header>
                    <Route exact path="/" component={Me} />
                    <Route path="/reports/week/:week" component={Report} />
                    <footer>
                        <p className="social"> <a href="https://github.com/pererselena"><i className="fab fa-github fa-3x"></i></a> <a href="https://www.linkedin.com/in/elena-perers/"><i className="fab fa-linkedin-in fa-3x"></i></a></p>
                        <p className="copyright">Copyright &copy; Elena Perers 2019</p>
                    </footer>
                </div>

            </Router>

        );
    }
}

export default App;
