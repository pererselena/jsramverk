import React from 'react';
import { Redirect } from 'react-router-dom';
import {
    withFormik,
    Form,
    Field,
    ErrorMessage
} from 'formik';
import { render } from 'react-dom';
import * as yup from 'yup';




const MyFormik = ({
    values,
    errors,
    touched
}) => (
        <main>
            <h2>Editera rapport.</h2>
            <p>Skriv din rapport i markdown.</p>
            <Form>
                <label htmlFor="weekNr">Veckonummer:<br />

                    <Field id="weekNr" type="number" name="week"
                        className={errors.week && touched.week ? ' is-invalid' : ''}
                        value={values.week} />
                    <ErrorMessage component="span" className="error" name="week" />
                </label><br />
                <label htmlFor="report1">Rapport:<br />
                    <Field id="report1" name="report" component="textarea" rows="10"
                        className={errors.report && touched.report ? ' is-invalid' : ''}
                        value={values.report}
                    />
                    <ErrorMessage component="span" className="error" name="report" />
                </label><br />
                <button className="btnPrimary">Spara</button>
            </Form>
        </main>

    )


const EditForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues({ week, report }) {
        return {
            week: week || "",
            report: report || "",
        };
    },

    validationSchema: yup.object().shape({
        week: yup.string().required("Veckonummer är obligatoriskt"),
        report: yup.string().required("Text är obligatoriskt"),
    }),


    handleSubmit: (values, { setSubmitting, resetForm, setStatus, props }) => {
        setTimeout(() => {
            resetForm();
            setSubmitting(false);
            var data = {
                week: values.week,
                report: values.report
            };
            console.log(data);
            // fetch('https://me-api.elenaperers.me/reports', {
            //     method: 'PUT',
            //     headers: {
            //         'x-access-token': localStorage.getItem("token"),
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data)
            // })
            // .then(res => res.json())
            // .then(function(res) {
            //     console.log(res);
            // });
            setStatus({
                redirectTo: true
            });
            props.callbackFromParent(true)
        }, 1000);
    }
})(MyFormik);

export default EditForm;
