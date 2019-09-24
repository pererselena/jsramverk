import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import EditForm from './EditForm';

class Edit extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            report: "",
            week: "",
            redirect: false
        };
    }

    componentDidMount() {
        let that = this;
        that._isMounted = true;

        if (that.props.match.params.week) {
            fetch(`https://me-api.elenaperers.me/reports/week/${that.props.match.params.week}`)
                .then(res => res.json())
                .then(function(text) {
                    if (that._isMounted) {
                        that.setState({
                            report: text.data.report,
                            week: that.props.match.params.week
                        });
                    }
                });

        }
    }

    componentWillUnmount() {
        this._isMounted = false;
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
