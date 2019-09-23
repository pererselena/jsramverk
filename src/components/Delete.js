import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: "",
            week: "",
            redirect: false
        };
    }

    componentDidMount() {
        if (this.props.match.params.week) {
            fetch(`https://me-api.elenaperers.me/reports/week/${this.props.match.params.week}`)
                .then(res => res.json())
                .then(text => this.setState({
                    report: text.data.report,
                    week: this.props.match.params.week
                }));
        }
    }

    delete(week) {
        var data = {
            week: week
        };

        fetch('https://me-api.elenaperers.me/reports', {
            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        this.setState({
            redirect: true
        });
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/reports/" />;
        }
        return (
            <main>
                <h2>Week { this.state.week }</h2>
                <p>Vill du verkligen ta bort denna rapport?</p>
                <button className="btnPrimary" onClick={() => this.delete(this.state.week)}>Radera</button>
            </main>

        );
    }
}


export default Delete;
