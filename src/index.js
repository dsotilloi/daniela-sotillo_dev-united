import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import AuthenticationProvider from './hooks/context/AuthenticationContext';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <Router>
          <App />
      </Router>
    </AuthenticationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

