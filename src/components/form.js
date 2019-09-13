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
                        <label>Namn:
                            <Field type="text" name="name" />
                        </label>
                        <label>Födelsedag:
                            <Field component="select" name="year">
                                {BYear().map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </Field>
                            <Field component="select" name="month">
                                {BMonth().map(month => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </Field>
                            <Field component="select" name="day">
                                {BDay().map(day => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </Field>
                        </label>
                        <label>Email:
                            <Field type="email" name="email" />
                        </label>
                        <label>Lösenord:
                            <Field type="password" name="password" />
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

function BYear() {
    let years = [];
    var today = new Date();
    var thisyear = today.getFullYear();
    for (var y=0; y<100; y++){
        years.push(thisyear);
        thisyear-=1;
    }
    return years;
}

function BMonth() {
    return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
}

function BDay() {
    let days = [];
    for (var y=1; y<=31; y++){
        days.push(y);
    }
    return days;
}

const SignUp = withFormik({
    mapPropsToValues({name, year, month, day, email, password}) {
        return{
            name: name || "",
            year: year || "",
            month: month || "",
            day: day || "",
            email: email || "",
            password: password || "",
        };



    },

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
