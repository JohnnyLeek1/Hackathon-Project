import React, { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from "react-router-dom";

export default function PastJournalsPage() {
    const [pastJournals, setPastJournals] = useState([]);

    useEffect(() => {
        fetch('/journals/get_journals/')
        .then(response => response.json())
        .then(data => {
            setPastJournals(data.journals)
        })
    }, [])

    return (
        <div id="past_journals_page">
            <div id="background"></div>
            <div id="container">
                <div id="past_journals_panel">
                    <NavLink to='/choice' id="back_button"><ArrowBackIcon/></NavLink>
                    <h3 id="title">Journal Entries</h3>
                    <ul id="past_journals_list">
                    {   
                        pastJournals.map((journal, index) => (
                            <li key={index} className={'journal_item'}>
                                <h4>{journal.title}</h4>
                                <p>{journal.letter_content}</p>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        </div>
    );
}