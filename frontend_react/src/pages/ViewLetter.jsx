import React, {useState, useEffect} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';

export default function ViewLetter() {
    const [title, setTitle] = useState('');
    const [letter, setLetter] = useState({});
    const [response, setResponse] = useState("");
    const [showTitleEntry, setShowTitleEntry] = useState(false);
    const [showLetter, setShowLetter] = useState(true);
    const {letter_id} = useParams();

    const navigate = useNavigate();
    const [animationClass, setAnimationClass] = useState('from_right');

    const back = to => {
        setAnimationClass('to_right');
        setTimeout(() => navigate(to), 500);
    }

    useEffect(() => {
        fetch(`/letters/get_letter/${letter_id}/`)
        .then(response => response.json())
        .then(data => {
            setLetter(data.letter)
        })
    }, [])

    const createResponse = () => {
        fetch('/letters/create_response/', {
            method: 'POST',
            body: JSON.stringify({'title': title, 'letter_content': response, 'response_to': letter_id})
        }).then(() => back('/respond'));
    }

    function respondToLetter() {
        setShowLetter(false);
    }

    return (
        <div id="journal_page" className={animationClass}>
            <div id="journal_highlight_background">
                <div id="highlighted_text"></div>
            </div>
            { showLetter ?
                <>
                    <a onClick={() => back('/respond')} id="view_letter_back_button"><ArrowBackIcon/></a>
                    <textarea readonly
                        id="journal_text" 
                        name="journal_text" 
                        rows="4"
                        placeholder="How are you feeling?"
                        value={letter.letter_content}
                    >
                    </textarea>
                    <span id='respond_button' onClick={() => respondToLetter()}>Respond</span>
                </>
                :
                <>
                    <a onClick={() => setShowLetter(true)} id="view_letter_back_button"><ArrowBackIcon/></a>
                    <textarea readonly
                        id="journal_text" 
                        name="journal_text" 
                        rows="4"
                        placeholder="What do you want to tell them?"
                        onChange={e => {setResponse(e.target.value);}}
                        value={response}
                    >
                    </textarea>
                    <div id="done_button_container" className={`${response !== ""? "fade_in" : "fade_out"} ${response === "" ? 'display_none' : undefined}`}>
                        <button id="done_button" onClick={() => setShowTitleEntry(true)}>Complete</button>
                    </div>
                </>
            }
            {
            showTitleEntry
                ? 
                <div id="enter_title_container">
                    <div id="enter_title" className="modal from_top">
                        <h1>Title your response:</h1>
                        <div id="input_container">
                            <input onChange={e => setTitle(e.target.value)} value={title}></input>
                        </div>
                        <div id="submit_container">
                            <span className='submit_button' onClick={() => createResponse()}>Send Response</span>
                        </div>
                    </div>
                </div>
                : undefined
            }
        </div>
    )
}