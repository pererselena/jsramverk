import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Readme from '../README.md';

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
      fetch(Readme)
      .then(res => res.text())
      .then(text => that.setState({
              questions: text
          })
      );
  }

  render() {
    return (
        <main>
            <h2>Week { this.state.week }</h2>
            <div className="question">
                <ReactMarkdown source={this.state.questions} />

            </div>
        </main>
    );
  }
}

export default Report;
