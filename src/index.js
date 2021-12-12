import React from 'react';
import ReactDOM from 'react-dom';
import AuthenticationProvider from './hooks/context/AuthenticationContext';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

