import React from "react";
import io from "socket.io-client";
import dotenv from "dotenv";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: [],
            sentName: false
        };

        dotenv.config();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        if (process.env.NODE_ENV === "production") {
            this.socket = io('https://socket.elenaperers.me:443');
        } else {
            this.socket = io('http://localhost:3005');
        }

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
            username: this.state.username,
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
        this.socket.emit('REGISTER_USER', {
            username: this.state.username,
            message: "Joined!"
        });
        this.setState({
            sentName: true
        });
    }

    componentWillUnmount() {
        this.socket.emit("DISCONNECT", {
            username: this.state.username
        });
        this.socket.close();
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
                            <div key={i}>{message.time} {message.username}: {message.message}</div>
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