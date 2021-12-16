import React, { useState, createContext } from "react";

export const PainterContext = createContext();

function PainterProvider({ children }) {

  const colorsList = [
    { name: "red", hex: "#F50D5A" },
    { name: "orange", hex: "#FF865C" },
    { name: "yellow", hex: "#FFEA5C" },
    { name: "green", hex: "#00DA76" },
    { name: "blue", hex: "#0096CE" },
    { name: "violet", hex: "#800FFF" }
  ];

  const [ stateColor, setStateColor ] = useState(false);



  return (
    <PainterContext.Provider
      value={ { colorsList, stateColor, setStateColor } }
    >
      {children}
    </PainterContext.Provider>
  );
}

export default PainterProvider;