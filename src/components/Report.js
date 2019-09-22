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
                fetch(`https://me-api.elenaperers.me/reports/week/${that.props.match.params.week}`)
                    .then(res => res.json())
                    .then(text => that.setState({
                        questions: text.data.report
                    })
                );
            }
            else {
                fetch(`https://me-api.elenaperers.me/reports/`)
                        .then(res => res.json())
                        .then(function(text){
                            let weekLink = "";
                            text.data.map(function(data){
                                weekLink= weekLink + `[Week ${data.week}](week/${data.week})` +"\n";
                            });
                            that.setState({
                                questions: weekLink
                            });
                        });
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
