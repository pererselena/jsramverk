import React, {
    Component
} from 'react';
import { Link } from 'react-router-dom';
import {
    withFormik,
    Form,
    Field,
    ErrorMessage
} from 'formik';
import * as yup from 'yup';
import SignUp from './Form.js';




class MyFormik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };
        this.toggleShow = this.toggleShow.bind(this);
    }

    render() {
        return (
            <main>
            <h2>Inloggning</h2>
            <p>När du loggar in dig här kan du skriva, redigera och radera redovisningstexter i ett formulärfält.</p>
            <Form>
                <label htmlFor="emailInput">Email:<br />

                    <Field id="emailInput" type="email" name="email" className={this.props.errors.email && this.props.touched.email ? ' is-invalid' : ''} value={this.props.values.email} />
                    <ErrorMessage component="span" className="error" name="email" />
                </label><br />
                <label htmlFor="passwordInput">Lösenord:<br />
                    <Field id="passwordInput" type={this.state.showPassword ? "text" : "password"} className={this.props.errors.password && this.props.touched.password ? ' is-invalid' : ''} name="password" value={this.props.values.password} />
                    <button type="button" className="showPassword" onClick={this.toggleShow}>Visa lösenord</button>
                    <ErrorMessage component="span" className="error" name="password" />
                </label><br />
            <Link to="/register"><button className="btnPrimary" type="button">Registrera</button></Link>

                <button className="btnPrimary">Logga in</button>
            </Form>
        </main>
        );
    }
    toggleShow() {
        this.setState({ showPassword: !this.state.showPassword });
    }
}

const SignIn = withFormik({
    mapPropsToValues({email, password}) {
        return{
            email: email || "",
            password: password || ""
        };
    },

    validationSchema: yup.object().shape({
        email: yup.string().email("Ogiltig e-post adress").required("E-post adress är obligatoriskt"),
        password: yup.string().min(8, "Lösenordet måste vara minst 8 tecken långt").required("Lösenord är obligatoriskt")
    }),


    handleSubmit: (values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
            resetForm();
            setSubmitting(false);
            var data = {
                password: values.password,
                email: values.email
            };
            fetch('https://me-api.elenaperers.me/login', {
                method: 'POST',
                body: data
            });
        }, 1000);
    }
})(MyFormik);

export default SignIn;
