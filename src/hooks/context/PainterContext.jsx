import React, { useState, createContext } from "react";

export const PainterContext = createContext();

function PainterProvider({ children }) {

  const colors = [
    { name: "red", hex: "#F50D5A" },
    { name: "orange", hex: "#FF865C" },
    { name: "yellow", hex: "#FFEA5C" },
    { name: "green", hex: "#00DA76" },
    { name: "blue", hex: "#0096CE" },
    { name: "violet", hex: "#800FFF" }
  ];

  const [colorList, setColorList] = useState(colors[0]);

  const handleColor = (color) => {
		setColorList(color);
	}

  return (
    <PainterContext.Provider
      value={ {colors, colorList, handleColor} }
    >
      {children}
    </PainterContext.Provider>
  );
}

export default PainterProvider;