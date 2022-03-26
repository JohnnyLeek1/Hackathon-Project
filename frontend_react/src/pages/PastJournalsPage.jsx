import React, { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export default function PastJournalsPage() {
    const [pastJournals, setPastJournals] = useState([]);

    const navigate = useNavigate();
    const [animationClass, setAnimationClass] = useState('from_right');

    const back = () => {
        setAnimationClass('to_right');
        setTimeout(() => navigate('/choice'), 500);
    }

    useEffect(() => {
        fetch('/journals/get_journals/')
        .then(response => response.json())
        .then(data => {
            setPastJournals(data.journals)
        })
    }, [])

    return (
        <div id="past_journals_page" className={animationClass}>
            <div id="container">
                <div id="past_journals_panel">
                    <a onClick={() => back()} id="back_button"><ArrowBackIcon/></a>
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