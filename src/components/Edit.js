import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import EditForm from './EditForm';

class Edit extends Component {
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

    callbackRedirect = (dataFromChild) => {
        this.setState({
            redirect: dataFromChild
        })
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/reports/" />;
        }
        return (
            <EditForm week={this.state.week} report={this.state.report} callbackFromParent={this.callbackRedirect} />

        );
    }
}


export default Edit;
