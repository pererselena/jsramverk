import React, { useEffect, useState } from 'react';
import dotenv from "dotenv";
import { Link } from "react-router-dom";



const ChatHistory = () => {
    const [messages, setMessages] = useState('');
    const [title, setTitle] = useState('');
    dotenv.config();

    useEffect(() => {
        var url = "";
        var isMounted = true;

        if (process.env.NODE_ENV === "production") {
            url = 'https://socket.elenaperers.me/chat';
        } else {
            url = 'http://localhost:3007/chat';
        }

        fetch(url)
            .then(res => res.json())
            .then(function (res) {
                if (isMounted) {
                    setTitle("Chatt historik");
                    setMessages(res);
                }
            });
        return function cleanup() {
            isMounted = false;
        }
    });

    return (
        <main>
            <h2>{title}</h2>
            <div className="messages">
                {
                    messages ? messages.map((msg, i) => {
                        return (
                            <div key={i}>{msg.time} {msg.username}: {msg.message}</div>
                        )}
                    ) : "Ingen historik"
                }
            </div>
            <Link to="/chat"><button className="btnPrimary">Tillbaka</button></Link>
        </main>
    );
};

export default ChatHistory;