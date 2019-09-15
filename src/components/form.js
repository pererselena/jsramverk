import React, {
    Component
} from 'react';
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
            showPassword: false,
        };
        this.toggleShow = this.toggleShow.bind(this);
    }

    render() {
        return (
            <main>
            <h2>Registreringsformulär</h2>
            <p>När du registrerar dig här kan du skriva redovisningstexter i ett formulärfält.</p>
            <Form>
                <label>Namn:<br />

                    <Field type="text" name="name" value={this.props.values.name}/>
                    <ErrorMessage component="span" className="error" name="name"/>
                </label><br />
                <label>Födelsedag:<br />
                    <Field component="select" name="year" value={this.props.values.year}>
                        {BYear().map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Field>
                    <Field component="select" name="month" value={this.props.values.month}>
                        {BMonth().map(month => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </Field>
                    <Field component="select" name="day" value={this.props.values.day}>
                        {BDay().map(day => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </Field>
                </label><br />
                <label>Email:<br />

                    <Field type="email" name="email" value={this.props.values.email} />
                    <ErrorMessage component="span" className="error" name="email" />
                </label><br />
                <label>Lösenord:<br />

                    <Field type={this.state.showPassword ? "text" : "password"} name="password" value={this.props.values.password} />
                    <button type="button" className="showPassword" onClick={this.toggleShow}>Visa lösenord</button>
                    <ErrorMessage component="span" className="error" name="password" />
                </label><br />
                <label>
                    <Field type="checkbox" name="gdpr" checked={this.props.values.gdpr} />
                    Jag godkänner att mina uppgifter lagras enligt GDPR
                    <ErrorMessage component="span" className="error" name="gdpr" />
                </label><br />
                <button>Registrera</button>
            </Form>
        </main>
        );
    }
    toggleShow() {
        this.setState({ showPassword: !this.state.showPassword });
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
    mapPropsToValues({name, year, month, day, email, password, gdpr}) {
        return{
            name: name || "",
            year: year || "",
            month: month || "",
            day: day || "",
            email: email || "",
            password: password || "",
            gdpr: gdpr || false,
        };
    },

    validationSchema: yup.object().shape({
        name: yup.string().required("Namn är obligatoriskt"),
        email: yup.string().email("Ogiltig e-post adress").required("E-post adress är obligatoriskt"),
        password: yup.string().min(8, "Lösenordet måste vara minst 8 tecken långt").required("Lösenord är obligatoriskt"),
        gdpr: yup.boolean().oneOf([true], "GDPR måste accepteras")
    }),


    handleSubmit: (values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
            resetForm();
            setSubmitting(false);
        }, 1000);
    }
})(MyFormik);

export default SignUp;
