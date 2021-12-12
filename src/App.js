import React from "react";
import PainterProvider from './hooks/context/PainterContext';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import './styles/app.css';

function App() {
  return (
    <div className="App">
      <PainterProvider>
        <Header />
        <Main />
      </PainterProvider>
      <Footer />
    </div>
  );
}

export default App;
