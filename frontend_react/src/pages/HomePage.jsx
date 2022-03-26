import React, {useState} from 'react';
import ActionC_maroonwhite from '../resources/ActionC_maroonwhite.png';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

    const navigate = useNavigate();
    const [animationClass, setAnimationClass] = useState('fade_in');

    const next = () => {
        setAnimationClass('to_left');
        setTimeout(() => navigate('/choice'), 500);
    }


    return (
        <div id="home_page" className={animationClass}>
        <div id="container">
            <h1 id="title">Wellbeing</h1>
            <button id="login_btn" onClick={() => next()}><span>Authenticate with </span><img src={ActionC_maroonwhite} alt="Cmich Logo" id="cmich_logo" /></button>
        </div>
        <p id="image_credit">Background: Justin Maller, <a>facets.la</a></p>
        </div>
    );

}
