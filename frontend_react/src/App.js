import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ChoicePage from './pages/ChoicePage';
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import PastJournalsPage from './pages/PastJournalsPage';
import RespondPage from './pages/RespondPage';
import ResponseLettersPage from './pages/ResponseLettersPage';
import ViewLetter from './pages/ViewLetter';
import './styles/App.scss';


function App() {

  return (
    <div id="root_container">
      <div id="background"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/choice" element={<ChoicePage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/respond" element={<RespondPage />} />
          <Route path="/journal_history" element={<PastJournalsPage />} />
          <Route path="/view_letters" element={<ResponseLettersPage />} />
          <Route path="/view_letter/:letter_id" element={<ViewLetter />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
