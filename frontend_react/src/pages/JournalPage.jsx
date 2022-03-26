import React, {useState, useEffect} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {ThinkingIcon, DoneIcon} from '../components/ThinkingIcon';
import { useNavigate } from 'react-router-dom';

const DemoPhrases = {
    "sad": { 'emotion': 'sad' },
    "dismal": { 'emotion': 'sad' },
    "heartbroken": { 'emotion': 'sad' },
    "mourn": { 'emotion': 'sad' },
    "sorry": { 'emotion': 'sad' },
    "unhappy": { 'emotion': 'sad' },
    "depressed": { 'emotion': 'sad' },
    "the dumps": { 'emotion': 'sad' },
    "morbid": { 'emotion': 'sad' },
    "not happy": { 'emotion': 'sad' },
    "feeling down": { 'emotion': 'sad' },
    "grief": { 'emotion': 'sad' },
    "pensive": { 'emotion': 'sad' },
    "anxious": { 'emotion': 'anxious' },
    "worried": { 'emotion': 'anxious' },
    "scared": { 'emotion': 'anxious' },
    "troubled": { 'emotion': 'anxious' },
    "concerned": { 'emotion': 'anxious' },
    "nervous": { 'emotion': 'anxious' },
    "dreading": { 'emotion': 'anxious' },
    "shook up": { 'emotion': 'anxious' },
    "annoyed": { 'emotion': 'anger' },
    "angry": { 'emotion': 'anger' },
    "enraged": { 'emotion': 'anger' },
    "bitter": { 'emotion': 'anger' },
    "furious": { 'emotion': 'anger' },
    "heaated": { 'emotion': 'anger' },
    "irate": { 'emotion': 'anger' },
    "offended": { 'emotion': 'anger' },
}

const ColorMap = {
    "sad": "blue",
    "anxious": "purple",
    "anger": "red"

}

export default function JournalPage() {

    const [title, setTitle] = useState('');
    const [journalText, setJournalText] = useState('');
    const [highlightedText, setHighlightedText] = useState('');
    const [typingTimeout, setTypingTimeout] = useState('');
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [showTitleEntry, setShowTitleEntry] = useState(false);
    const [animationClass, setAnimationClass] = useState('from_right');

    const navigate = useNavigate();

    const back = () => {
        setAnimationClass('to_right');
        setTimeout(() => navigate('/choice'), 500);
    }

    // When the user finishes typing (that is, they haven't pressed a key in a min)
    const onFinishTyping = () => {
        let tempText = highlightedText;

        for(const phrase in DemoPhrases) {
            tempText = tempText.replace(RegExp(`[^.]*${phrase}[^.]*.`, 'gi'), `<mark class="${ColorMap[DemoPhrases[phrase].emotion]}">$&</mark>`)
        }

        setHighlightedText(tempText);
        // setHighlightedText(highlightedText.replace(/\n$/g, '\n\n').replace(/[A-Z].*?\b/g, '<mark>$&</mark>'))
        setAnalysisComplete(true);
    }

    // Start the timer for whether or not the user is done typing
    useEffect(() => {
        
        if(typingTimeout) {
            clearTimeout(typingTimeout);
        }

        if(journalText !== "") {
            setTypingTimeout(setTimeout(onFinishTyping, 1000));
            setAnalysisComplete(false);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [journalText]);

    const createJournal = () => {
        fetch('/journals/create_journal/', {
            method: 'POST',
            body: JSON.stringify({'title': title, 'letter_content': journalText})
        }).then(() => back());


    }

    return (
        <div id="journal_page" className={animationClass}>
            <div id="inner_container" className="page-container page">
                <a onClick={() => back()} id="journal_back_button"><ArrowBackIcon/></a>
                <div id="journal_highlight_background">
                    <div id="highlighted_text" dangerouslySetInnerHTML={{__html: highlightedText}}></div>
                </div>
                <textarea 
                    id="journal_text" 
                    name="journal_text" 
                    rows="4"
                    placeholder="How are you feeling?"
                    onChange={e => {setJournalText(e.target.value); setHighlightedText(e.target.value); }}
                    value={journalText}
                >
                </textarea>
                <div id="thinking_icon">
                    { journalText !== "" 
                    ? !analysisComplete 
                        ? <ThinkingIcon />
                        : <DoneIcon />
                    : undefined
                    }
                </div>
                <div id="done_button_container" className={`${journalText !== ""? "fade_in" : "fade_out"} ${journalText === "" && !analysisComplete ? 'display_none' : undefined}`}>
                    <button id="done_button" onClick={() => setShowTitleEntry(true)}>Complete</button>
                </div>
                {
                showTitleEntry
                    ? 
                    <div id="enter_title_container">
                        <div id="enter_title" className="modal from_top">
                            <h1>Title your entry:</h1>
                            <div id="input_container">
                                <input onChange={e => setTitle(e.target.value)} value={title}></input>
                                <div id="submit_button" onClick={() => createJournal()}>✓</div>
                            </div>
                        </div>
                    </div>
                    : undefined
                }
            </div>
        </div>
    );

}