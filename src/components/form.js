import React, {
    Component
} from 'react';
/*import {
    withFormik,
    Form,
    Field
} from 'formik';
import Yup from 'yup';
*/



class SignUp extends Component {
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

                </main>
        });

    }

    render() {
        return (
            this.state.message
        );
    }
}

export default SignUp;
