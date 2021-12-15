import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthenticationProvider from './hooks/context/AuthenticationContext';
import App from './App';
import UserFeed from "./components/UserFeed";
import NotFound404 from './components/NotFound404';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <Router>
        <Routes>
          <Route path="/" element={ <App /> } />
          <Route path="/feed" element={ <UserFeed /> } />
          <Route path="*" element={ <NotFound404 /> } />
        </Routes>
      </Router>
    </AuthenticationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

