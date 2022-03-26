import React, {useState, useEffect, useRef} from 'react';
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
    "happy": { 'emotion': 'happy' },
    "cheerful": { 'emotion': 'happy' },
    "good": { 'emotion': 'happy' },
    "glad": { 'emotion': 'happy' },
    "grateful": { 'emotion': 'happy' },
    "pleasant": { 'emotion': 'happy' },
    "peaceful": { 'emotion': 'happy' },
    "delighted": { 'emotion': 'happy' },
    "upbeat": { 'emotion': 'happy' },

    "I know if I ask her to the dance she's going to say no": { 'emotion': 'anxious' },
    "I bet no one will come to my party": { 'emotion': 'anxious' },
    "They probably think": { 'emotion': 'anxious' },
    "I bet she thinks": { 'emotion': 'anxious' },
    "Everything I say is dumb": { 'emotion': 'sad' },
    "Everything I do is dumb": { 'emotion': 'sad' },
    "I can't do anything right": { 'emotion': 'sad' }
}

const ColorMap = {
    "sad": "blue",
    "anxious": "purple",
    "anger": "red",
    "happy": "green"

}

const ThinkingErrors = {

    "I know if I ask her to the dance she's going to say no": "Fortune Telling",
    "I bet no one will come to my party": "Fortune Telling",
    "They probably think": "Mind Reading",
    "I bet she thinks": "Mind Reading",
    "Everything I say is dumb": "Negative Labeling",
    "Everything I do is dumb": "Negative Labeling",
    "I can't do anything right": "Negative Labeling"

}

const ThinkingErrorDescriptions = { 
    
    "Fortune Telling": "Thinking you know what will happen in the future, and that it will be bad.",
    "Mind Reading": "Believing you know what someone else is thinking, or why they are doing something, without having enough information",
    "Negative Labeling": "Having a negative belief about yourself and thinking it applies to everything you do."

}

export default function JournalPage() {

    const [title, setTitle] = useState('');
    const [journalText, setJournalText] = useState('');
    const [highlightedText, setHighlightedText] = useState('');
    const [typingTimeout, setTypingTimeout] = useState('');
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [showTitleEntry, setShowTitleEntry] = useState(false);
    const [animationClass, setAnimationClass] = useState('from_right');
    const [sentimentAnalysis, setSentimentAnalysis] = useState([]);
    const [sentimentAnalysisModal, setSentimentAnalysisModal] = useState(false);
    const [thinkingErrors, setThinkingErrors] = useState([]);

    const journalTextArea = useRef(undefined);

    const navigate = useNavigate();

    const back = () => {
        setAnimationClass('to_right');
        setTimeout(() => navigate('/choice'), 500);
    }


    // When the user finishes typing (that is, they haven't pressed a key in a min)
    const onFinishTyping = () => {
        let tempText = highlightedText;
        let tempErrors = [];

        for(const phrase in DemoPhrases) {
            tempText = tempText.replace(RegExp(`[^.]*${phrase}[^.]*.`, 'gi'), `<mark class="${ColorMap[DemoPhrases[phrase].emotion]}">$&</mark>`)

        }

        setHighlightedText(tempText);

        for(const error in ThinkingErrors) {
            if(journalText.toLowerCase().includes(error.toLowerCase())) {
                tempErrors.push(ThinkingErrors[error]);
            }
        }

        setThinkingErrors(tempErrors);

        fetch('/journals/analyze_journal/', {
            method: 'POST',
            body: JSON.stringify({text: journalText})
        }).then(response => response.json())
        .then(data => {
            setSentimentAnalysis(data.data);
            setAnalysisComplete(true);
        });
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

    const focusJournalArea = () => {
        journalTextArea.current.focus({preventScroll: true});
    }

    const createJournal = () => {
        fetch('/journals/create_journal/', {
            method: 'POST',
            body: JSON.stringify({'title': title, 'letter_content': journalText})
        }).then(() => back());


    }

    const createLetter = () => {
        fetch('/letters/create_letter/', {
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
                    ref={journalTextArea}
                    placeholder="How are you feeling?"
                    onChange={e => {setJournalText(e.target.value); setHighlightedText(e.target.value); }}
                    value={journalText}
                >
                </textarea>
                <div id="thinking_icon">
                    { journalText !== "" 
                    ? !analysisComplete 
                        ? <ThinkingIcon />
                        : <DoneIcon onClick={() => setSentimentAnalysisModal(true)}/>
                    : undefined
                    }
                </div>
                <div id="done_button_container" className={`${journalText !== ""? "fade_in" : "fade_out"} ${journalText === "" && !analysisComplete ? 'display_none' : undefined}`}>
                    <button id="done_button" onClick={() => setSentimentAnalysisModal(true)}>Analyze</button>
                </div>
                {
                sentimentAnalysisModal
                    ? 
                    <div id="sentiment_analysis_container">
                        <div id="sentiment_analysis" className="modal from_bottom">
                            <h1>This journal sounds</h1>
                            <h3 className="sentiment_value_text">{sentimentAnalysis.value}</h3>
                            <div id="negative_thought_patterns">
                                {
                                    sentimentAnalysis.value == "NEGATIVE"
                                    ?
                                        <>
                                            <h3>Your negative thought errors:</h3>
                                            <ul>
                                                {thinkingErrors.length === 0 ? <li>Nothing specific detected.</li> : undefined}
                                                {thinkingErrors.map((error, i) => {
                                                    return (
                                                        <li key={i}>{error} - {ThinkingErrorDescriptions[error]}</li>
                                                    );
                                                })}
                                            </ul>
                                            <div id="submit_container">
                                                <span className='submit_button' onClick={() => setShowTitleEntry(true)}>Save Journal</span>
                                            </div>
                                        </>
                                    : undefined
                                }
                            </div>
                        </div>
                    </div>
                    : undefined
                }

                {
                showTitleEntry
                    ? 
                    <div id="enter_title_container">
                        <div id="enter_title" className="modal from_top">
                            <h1>Title your entry:</h1>
                            <div id="input_container">
                                <input onChange={e => setTitle(e.target.value)} value={title}></input>
                            </div>
                            <div id="submit_container">
                                <span className='submit_button' onClick={() => createJournal()}>Create Journal</span>
                                <span className='submit_button' onClick={() => createLetter()}>Send Letter</span>
                            </div>
                        </div>
                    </div>
                    : undefined
                }
            </div>
        </div>
    );

}