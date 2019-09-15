import React, {
    Component
} from 'react';
import {
    withFormik,
    Form,
    Field
} from 'formik';
import * as yup from 'yup';




class MyFormik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        };
    }

    render() {
        return (
            <main>
            <h2>Registreringsformulär</h2>
            <p>När du registrerar dig här kan du skriva redovisningstexter i ett formulärfält.</p>
            <Form>
                <label>Namn:<br />
                    {this.props.touched.name && this.props.errors.name && <p>{this.props.errors.name}</p>}
                    <Field type="text" name="name" value={this.props.name}/>

                </label><br />
                <label>Födelsedag:<br />
                    <Field component="select" name="year" value={this.props.year}>
                        {BYear().map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Field>
                    <Field component="select" name="month" value={this.props.month}>
                        {BMonth().map(month => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </Field>
                    <Field component="select" name="day" value={this.props.day}>
                        {BDay().map(day => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </Field>
                </label><br />
                <label>Email:<br />
                {this.props.touched.email && this.props.errors.email && <p>{this.props.errors.email}</p>}
                    <Field type="email" name="email" value={this.props.email} />
                </label><br />
                <label>Lösenord:<br />
                    {this.props.touched.password && this.props.errors.password && <p>{this.props.errors.password}</p>}
                    <Field type="password" name="password" value={this.props.password} />
                </label><br />
                <label>
                    <Field type="checkbox" name="gdpr" checked={this.props.gdpr} />
                    Jag godkänner att mina uppgifter lagras enligt GDPR
                </label><br />
                <button >Registrera</button>
            </Form>
        </main>
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
    }),


    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    }
})(MyFormik);

export default SignUp;
