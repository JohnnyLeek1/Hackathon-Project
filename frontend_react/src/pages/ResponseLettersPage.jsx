import React, { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";

export default function RespondPage() {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        fetch('/letters/get_responses/')
        .then(response => response.json())
        .then(data => {
            setResponses(data.responses)
        })
    }, [])

    return (
        <div id="response_page">
            <div id="background"></div>
            <div id="container">
                <div id="response_panel">
                    <NavLink to='/choice' id="back_button"><ArrowBackIcon/></NavLink>
                    <h3 id="title">Letters To Respond To</h3>
                    <ul id="response_list">
                    {   
                        responses.map((response, index) => (
                            <li key={index} className={'response_item'}>
                                <h4>{response.title}</h4>
                                <p>{response.letter_content}</p>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        </div>
    );
}