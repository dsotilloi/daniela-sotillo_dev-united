import React, { useContext } from "react";
import { AppContext } from './hooks/context/AppContext';
import { Routes, Route } from "react-router-dom";
import UserRegister from "./components/presentational/UserRegister";
import Feed from "./components/containers/Feed";
import Profile from "./components/containers/Profile";
import NotFound404 from './components/presentational/NotFound404';
import Footer from "./components/presentational/Footer";
import './styles/app.css';

function App() {

  const { logout } = useContext(AppContext);
  return (
    <div className="App">

        <Routes>
          <Route path="/" element={ <UserRegister /> } />
          <Route path="/feed" element={ <Feed /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="*" element={ <NotFound404 /> } />
        </Routes>

      <Footer />

      <button onClick={logout}>Cerrar sesión</button>  
    </div>
  );
}

export default App;
