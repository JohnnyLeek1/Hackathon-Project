import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Router from './Router';
import './styles/App.scss';


function App() {

  return (
    <div id="root_container">
      <div id="background"></div>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
