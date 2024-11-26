import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContextAPI from './components/ContextAPI';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ContextAPI>
        <App />
      </ContextAPI>
    </Router >
  </React.StrictMode>
);
