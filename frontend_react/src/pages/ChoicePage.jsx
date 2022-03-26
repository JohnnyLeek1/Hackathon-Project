import React from "react";
import { NavLink } from "react-router-dom";

export default function ChoicePage() {
    return (
        <div id="choice_page">
            <div id="background"></div>
            <div id="container">
                <div id="choice_panel">
                    <h3 id="title">Good evening, Johnny</h3>
                    <h5 id="subtitle">What would you like to do tonight?</h5>

                    <div id="buttons">
                        <NavLink to='/journal'>
                            <button id="journal_btn">Journal About My Day</button>
                        </NavLink>
                        <NavLink to='/respond'>
                            <button id="respond_btn">Respond to Other Students</button>
                        </NavLink>
                        <NavLink to='/view_letters'>
                            <button id="view_letters_btn">View Letters to Me</button>
                        </NavLink>
                        <NavLink to='/journal_history'>
                            <button id="past_entries_btn">View Past Journal Entries</button>
                        </NavLink>
                        <NavLink to='/browse_advice'>
                            <button id="advice_btn">Browse Mental Health Advice</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}