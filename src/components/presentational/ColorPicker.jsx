import React from 'react';
import '../../styles/colorPicker.css';

function ColorPicker({ color, handle }) {

  return (
    <li 
    className='color-picker'
    onClick={() => handle( color.name )}
    style={{ backgroundColor: color.hex }} >
    </li>
  );
}

export default ColorPicker;