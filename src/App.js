import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AuthenticationContext } from './hooks/context/AuthenticationContext';
import PainterProvider from './hooks/context/PainterContext';
import UserFeed from "./components/UserFeed"
import UserRegister from "./components/UserRegister";
import Footer from "./components/Footer";
import './styles/app.css';

function App() {

  const { user, logout } = useContext(AuthenticationContext);
  console.log(user)

  return (
    <div className="App">
        <PainterProvider>

      <Routes>

        {user ? (
          <Route path="/feed" element={ <UserFeed /> } />
        ):(
          <Route path="/register" element={ <UserRegister /> } />
          )
        }
      </Routes>

        </PainterProvider>

        <Footer />

        <Link to="/feed">
          <button>Ir al feed</button>      
        </Link>

        <button onClick={logout}>Cerrar sesión</button>      


    </div>
  );
}

export default App;
