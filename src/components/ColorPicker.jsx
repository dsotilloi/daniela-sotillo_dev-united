import React from "react";
import '../styles/colorPicker.css';

function ColorPicker({color, handleColor}) {

  return (
    <li 
    className="color-picker"
    onClick={() => handleColor(color.hex)}
    style={{ backgroundColor: color.hex }} >
    </li>
  );
}

export default ColorPicker;