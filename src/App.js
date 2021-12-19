import React, { useContext } from "react";
import { AppContext } from './hooks/context/AppContext';
import { Routes, Route } from "react-router-dom";
import UserRegister from "./components/routes/UserRegister";
import UserFeed from "./components/routes/UserFeed";
import NotFound404 from './components/routes/NotFound404';
import Footer from "./components/presentational/Footer";
import './styles/app.css';

function App() {

  const { logout } = useContext(AppContext);
  return (
    <div className="App">

        <Routes>
          <Route path="/" element={ <UserRegister /> } />
          <Route path="/feed" element={ <UserFeed /> } />
          <Route path="*" element={ <NotFound404 /> } />
        </Routes>

      <Footer />

      <button onClick={logout}>Cerrar sesión</button>  
    </div>
  );
}

export default App;
