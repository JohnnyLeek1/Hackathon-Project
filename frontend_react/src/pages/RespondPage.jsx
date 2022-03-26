import React, { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";

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
                    <NavLink to='/choice' id="back_button"><ArrowBackIcon/></NavLink>
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