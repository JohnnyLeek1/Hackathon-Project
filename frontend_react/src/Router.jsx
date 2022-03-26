import React, { useState, useEffect } from 'react';
import {Routes, useLocation, Route} from 'react-router-dom';
import ChoicePage from './pages/ChoicePage';
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import PastJournalsPage from './pages/PastJournalsPage';
import RespondPage from './pages/RespondPage';
import ResponseLettersPage from './pages/ResponseLettersPage';
import './styles/App.scss';

export default function Router() {
    return (
        <Routes>
            <Route path="/choice" element={<ChoicePage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/respond" element={<RespondPage />} />
            <Route path="/journal_history" element={<PastJournalsPage />} />
            <Route path="/view_letters" element={<ResponseLettersPage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
}