import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function ChoicePage() {

    const navigate = useNavigate();
    const [animationClass, setAnimationClass] = useState('from_right');

    const next = to => {
        setAnimationClass('to_left');
        setTimeout(() => navigate(to), 500);
    }

    return (
        <div id="choice_page" className={animationClass}>
            <div id="inner_container" className="page-container page">
                <div id="container">
                    <div id="choice_panel">
                        <h3 id="title">Good evening, Johnny</h3>
                        <h5 id="subtitle">What would you like to do tonight?</h5>
                        <div id="buttons">
                            <button id="journal_btn" onClick={() => next('/journal')}>Journal About My Day</button>
                            <button id="respond_btn" onClick={() => next('/respond')}>Respond to Other Students</button>
                            <button id="view_letters_btn" onClick={() => next('/view_letters')}>View Letters to Me</button>
                            <button id="past_entries_btn" onClick={() => next('/journal_history')}>View Past Journal Entries</button>
                            <button id="advice_btn" onClick={() => next('/browse_advice')}>Browse Mental Health Advice</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}