import React, {
    Component
} from 'react';




class Form extends Component {
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

                </main>
        });

    }

    render() {
        return (
            this.state.message
        );
    }
}

export default Form;
