import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

export default function ViewLetter() {
    const [letter, setLetter] = useState({});
    const {letter_id} = useParams();

    useEffect(() => {
        fetch(`/letters/get_letter/${letter_id}/`)
        .then(response => response.json())
        .then(data => {
            setLetter(data.letter)
        })
    }, [])

    return (
        <div id="journal_page">
            <div id="background"></div>
            <div id="journal_highlight_background">
                <div id="highlighted_text"></div>
            </div>
            <textarea readonly
                id="journal_text" 
                name="journal_text" 
                rows="4"
                placeholder="How are you feeling?"
                value={letter.letter_content}
            >
            </textarea>
            <span id='respond_button'>Respond</span>
        </div>
    )
}