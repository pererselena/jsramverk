import React from "react";
import io from "socket.io-client";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: [],
            sentName: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.socket = io('10.1.0.209:3005');

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };
    }

    sendMessage(ev) {
        ev.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: this.state.message
        })
        this.setState({ message: '' });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    registerUser() {
        this.socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: "Joined!"
        });
        this.setState({
            sentName: true
        });
    }

    render() {
        if (!this.state.sentName) {
            return (
                <main>
                    <h2>Chat</h2>
                    <div className="card-footer">
                        <input type="text" placeholder="Username" className="form-control" name="username" onChange={this.handleInputChange} />
                        <br />
                        <button onClick={this.registerUser} className="btnPrimary">Registrera</button>
                    </div>
                </main>
            );
        }
        return (
            <main>
                <h2>Chat</h2>
                <div className="messages">
                    {this.state.messages.map((message, i) => {
                        return (
                            <div key={i}>{message.author}: {message.message}</div>
                        )
                    })}
                </div>
                <div className="card-footer">
                    <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" disabled />
                    <br />
                    <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                    <br />
                    <button onClick={this.sendMessage} className="btnPrimary">Skicka</button>
                </div>
            </main>
        );
    }
}

export default Chat;