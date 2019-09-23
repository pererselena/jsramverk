import React, {
    Component
} from 'react';
import { Redirect } from 'react-router-dom';
import {
    withFormik,
    Form,
    Field,
    ErrorMessage
} from 'formik';
import * as yup from 'yup';




class MyFormik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: false
        };
    }

    render() {
        if (this.props.status) {
            const redirectTo = this.props.status.redirectTo;
            if (redirectTo === true) {
                return <Redirect to="/reports/" />;
            }
        }
        return (
            <main>
            <h2>Skapa rapport.</h2>
            <p>Skriv din rapport i markdown.</p>
            <Form>
                <label htmlFor="weekNr">Veckonummer:<br />

                    <Field id="weekNr" type="number" name="week" className={this.props.errors.week && this.props.touched.week ? ' is-invalid' : ''} value={this.props.values.week} />
                    <ErrorMessage component="span" className="error" name="week" />
                </label><br />
                <label htmlFor="report1">Rapport:<br />
                    <Field id="report1" name="report" component="textarea" rows="10" className={this.props.errors.report && this.props.touched.report ? ' is-invalid' : ''} value={this.props.values.report} />
                    <ErrorMessage component="span" className="error" name="report" />
                </label><br />
                <button className="btnPrimary">Skapa</button>
            </Form>
        </main>
        );
    }
}

const Create = withFormik({
    mapPropsToValues({week, report}) {
        return{
            week: week || "",
            report: report || "",
        };
    },

    validationSchema: yup.object().shape({
        week: yup.string().required("Veckonummer är obligatoriskt"),
        report: yup.string().required("Text är obligatoriskt"),
    }),


    handleSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
        setTimeout(() => {
            resetForm();
            setSubmitting(false);
            var data = {
                week: values.week,
                report: values.report
            };
            fetch('https://me-api.elenaperers.me/reports', {
                method: 'POST',
                headers: {
                    'x-access-token': localStorage.getItem("token"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(function(res) {
                console.log(res);
            });
            setStatus({
                redirectTo: true
            });
        }, 1000);
    }
})(MyFormik);

export default Create;
