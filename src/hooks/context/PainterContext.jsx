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

  const [ colorSelected, setColorSelected ] = useState(colorsList[0]);
  const [ stateColor, setStateColor ] = useState(false);

  const handleColor = (color) => {
		setColorSelected(color);
    setStateColor(true);
	}

  return (
    <PainterContext.Provider
      value={ { colorSelected, colorsList, handleColor, stateColor } }
    >
      {children}
    </PainterContext.Provider>
  );
}

export default PainterProvider;