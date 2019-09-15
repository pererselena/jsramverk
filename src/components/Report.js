import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Readme from '../README.md';
import WeekTwo from '../week2.md';
import Reports from '../reports.md';

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: "",
            week: props.match.params.week
        };
    }

    componentDidMount() {
            let that = this;

            if (that.props.match.params.week) {
                if (that.props.match.params.week === "1") {
                    fetch(Readme)
                        .then(res => res.text())
                        .then(text => that.setState({
                            questions: text
                        })
                        );
                }
                else if (that.props.match.params.week === "2") {
                    fetch(WeekTwo)
                        .then(res => res.text())
                        .then(text => that.setState({
                            questions: text
                        })
                        );
                }
            }
            else {
                fetch(Reports)
                        .then(res => res.text())
                        .then(text => that.setState({
                            questions: text
                        })
                        );
            }


        }

        render() {
            return (
                <main>
                    <h2>Week {this.state.week}</h2>
                    <div className="question">
                        <ReactMarkdown source={this.state.questions} />

                    </div>
                </main>
            );
        }
    }

    export default Report;
