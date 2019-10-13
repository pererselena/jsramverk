import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Me from './components/Me.js';
import Report from './components/Report.js';
import SignUp from './components/Form.js';
import SignIn from './components/Form-lgn.js';
import Create from './components/Create.js';
import Edit from './components/Edit.js';
import Delete from './components/Delete.js';
import Chat from './components/Chat.js';
import ChatHistory from './components/ChatHistory';

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
                                <Link to="/reports/">Rapporter</Link>
                                <Link to="/login">Logga in</Link>
                                <Link to="/chat">Chat</Link>
                            </nav>
                        </div>
                    </header>
                    <Route exact path="/" component={Me} />
                    <Route path="/reports/week/:week" component={Report} />
                    <Route exact path="/reports/" component={Report} />
                    <Route exact path="/reports/create/" component={Create} />
                    <Route exact path="/reports/edit/:week" component={Edit} />
                    <Route exact path="/reports/delete/:week" component={Delete} />
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/register" component={SignUp} />
                    <Route exact path="/chat" component={Chat} />
                    <Route exact path="/chat/history" component={ChatHistory} />
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
