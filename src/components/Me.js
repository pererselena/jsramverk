import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';




const Me = () => {
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
    fetch('https://me-api.elenaperers.me/')
        .then(res => res.json())
        .then(function(res) {
            setTitle(res.data.title);
            setMessage(res.data.msg);
        });
    });

    return (
    <main>
        <h2>{title}</h2>
        <article className="me-article">
            <ReactMarkdown source={ message } />
        </article>
    </main>
    );
};

export default Me;
