import React, { useEffect, useState } from "react";

export default function RespondPage() {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        fetch('/letters/get_letters/')
        .then(response => response.json())
        .then(data => {
            setLetters(data.letters)
        })
    }, [])

    return (
        <div id="respond_page">
            <div id="background"></div>
            <div id="container">
                <div id="respond_panel">
                    <h3 id="title">Letters To Respond To</h3>
                    <ul id="letter_list">
                    {   
                        letters.map((letter, index) => (
                            <li key={index} className={'letter_item'}>
                                <h4>{letter.title}</h4>
                                <p>{letter.letter_content}</p>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        </div>
    );
}