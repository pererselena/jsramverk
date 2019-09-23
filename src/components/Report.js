import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';


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
                            weekLink = weekLink + `[Week ${data.week}](/week/${data.week}) \n`;
                            return weekLink;
                        });
                        that.setState({
                            questions: weekLink
                        });
                    });
        }
    }

    createReport() {
        if (this.props.match.params.week) {
            if (localStorage.token) {
                var week = this.props.match.params.week;
                let editLink = "/reports/edit/" + week;
                let deleteLink = "/reports/delete/" + week;
                return <div><Link to={editLink}>
                    <button className="btnPrimary" type="button">Editera</button>
                </Link>
                <Link to={deleteLink}><button className="btnPrimary" type="button">Radera</button></Link></div>;
            }
        }
        if (localStorage.token) {
            return <Link to="/reports/create"><button className="btnPrimary" type="button">Skapa rapport</button></Link>;
        }
    }

    render() {
        return (
            <main>
                <h2>Week {this.state.week}</h2>
                <div className="question">
                    <ReactMarkdown source={this.state.questions} />
                </div>
                {this.createReport()}
            </main>
        );
    }
}

export default Report;
