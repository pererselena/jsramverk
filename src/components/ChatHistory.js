import React, { useEffect, useState } from 'react';
import dotenv from "dotenv";



const ChatHistory = () => {
    const [messages, setMessages] = useState('');
    const [title, setTitle] = useState('');
    dotenv.config();

    useEffect(() => {
        var url = "";
        if (process.env.NODE_ENV === "production") {
            url = 'https://socket.elenaperers.me/chat';
        } else {
            url = 'http://localhost:3007/chat';
        }

        fetch(url)
            .then(res => res.json())
            .then(function (res) {
                setTitle("Chatt historik");
                setMessages(res);
            });
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
        </main>
    );
};

export default ChatHistory;