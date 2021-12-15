import React, { useContext } from "react";
import PainterProvider from './hooks/context/PainterContext';
import { AuthenticationContext } from './hooks/context/AuthenticationContext';
import { Outlet } from "react-router-dom";
import UserRegister from "./components/UserRegister";
import Footer from "./components/Footer";
import './styles/app.css';

function App() {

  const { logout } = useContext(AuthenticationContext);
  return (
    <div className="App">
      <PainterProvider>

        <UserRegister />

      </PainterProvider>
      
      <Footer />

      <Outlet />

      <button onClick={logout}>Cerrar sesión</button>  
    </div>
  );
}

export default App;
