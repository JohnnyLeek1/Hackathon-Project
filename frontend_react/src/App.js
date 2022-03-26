import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ChoicePage from './pages/ChoicePage';
import HomePage from './pages/HomePage';
import PastJournalsPage from './pages/PastJournalsPage';
import RespondPage from './pages/RespondPage';
import './styles/App.scss';

function App() {
  return (
    <div id="root_container">
      <BrowserRouter>
        <Routes>
          <Route path="/choice" element={<ChoicePage />} />
          <Route path="/respond" element={<RespondPage />} />
          <Route path="/journal_history" element={<PastJournalsPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
