import React, {
    Component
} from 'react';
import {
    withFormik,
    Form,
    Field
} from 'formik';
//import Yup from 'yup';




class MyFormik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        };
    }

    componentDidMount() {
        let that = this;

        that.setState({
            message:
                <main>
                    <h2>Registreringsformulär</h2>
                    <p>När du registrerar dig här kan du skriva redovisningstexter i ett formulärfält.</p>
                    <Form>
                        <label>Email:
                            <Field type="email" name="email" />
                        </label>
                    </Form>

                </main>
        });

    }

    render() {
        return (
            this.state.message
        );
    }
}

const SignUp = withFormik({
    mapPropsToValues: () => ({ email: "" }),

    // Custom sync validation
    validate: values => {
        const errors = {};

        if (!values.email) {
            errors.name = "Required";
        }
        console.log(errors);
        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: "BasicForm"
})(MyFormik);

export default SignUp;
