/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
// Router
import { BrowserRouter } from 'react-router-dom';
// Components
import App from './App';
// Styles
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>
);
