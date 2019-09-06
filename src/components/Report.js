import React, { Component } from 'react';

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            week: props.match.params.week
        };
    }

  componentDidMount() {
      let that = this;
      fetch("https://me-api.jsramverk.me/reports/" + this.state.week)
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
          that.setState({
              questions: result.data
          });
      });
  }

  render() {
    const renderedQuestions = this.state.questions.map((question, index) => {
        return (
            <div className="question" key={index}>
                <p><strong>{ question.question }</strong></p>
                <p>{ question.answer }</p>
            </div>
        )
    });

    return (
        <main>
            <h2>{ this.state.week }</h2>
            { renderedQuestions }
        </main>


    );
  }
}

export default Report;
