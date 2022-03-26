import React from 'react';
import ActionC_maroonwhite from '../resources/ActionC_maroonwhite.png';
import { NavLink } from 'react-router-dom';

export default function HomePage() {
  return (
    <div id="home_page">
      <div id="background"></div>
      <div id="container">
        <h1 id="title">App Title</h1>
        <NavLink to="/choice">
            <button id="login_btn"><span>Authenticate with </span><img src={ActionC_maroonwhite} alt="Cmich Logo" id="cmich_logo" /></button>
        </NavLink>
      </div>
    </div>
  );
}
