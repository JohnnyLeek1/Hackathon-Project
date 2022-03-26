import React, { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export default function RespondPage() {
    const [letters, setLetters] = useState([]);

    const navigate = useNavigate();
    const [animationClass, setAnimationClass] = useState('from_right');

    const back = () => {
        setAnimationClass('to_right');
        setTimeout(() => navigate('/choice'), 500);
    }

    useEffect(() => {
        fetch('/letters/get_letters/')
        .then(response => response.json())
        .then(data => {
            setLetters(data.letters)
        })
    }, [])

    return (
        <div id="respond_page" className={animationClass}>
            <div id="container">
                <div id="respond_panel">
                    <a onClick={() => back()} id="back_button"><ArrowBackIcon/></a>
                    <h3 id="title">Letters To Respond To</h3>
                    <ul id="letter_list">
                    {   
                        letters.map((letter, index) => (
                            <NavLink to={`/view_letter/${letter.pk}`}>
                                <li key={index} className={'letter_item'}>
                                    <h4>{letter.title}</h4>
                                    <p>{letter.letter_content}</p>
                                </li>
                            </NavLink>
                        ))
                    }
                    </ul>
                </div>
            </div>
        </div>
    );
}