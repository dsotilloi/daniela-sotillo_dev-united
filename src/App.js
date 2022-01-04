import React from "react";
import { Routes, Route } from "react-router-dom";

import Feed from "./components/containers/Feed";
import Footer from "./components/presentational/Footer";
import NotFound404 from './components/presentational/NotFound404';
import PostAuthorProfile from "./components/presentational/PostAuthorProfile";
import Profile from "./components/containers/Profile";
import UserRegister from "./components/presentational/UserRegister";

import './styles/app.css';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/profile/:authorUid" element={ <PostAuthorProfile /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/feed" element={ <Feed /> } />
        <Route path="/" element={ <UserRegister /> } />
        <Route path="*" element={ <NotFound404 /> } />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
