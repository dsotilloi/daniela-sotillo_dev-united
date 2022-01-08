import React from 'react';
import PropTypes from 'prop-types';

import './colorPicker.css';


function ColorPicker({ color, handle }) {

  const cssColorSelected = color.selected ? 'white-border' : undefined;
  
  return (
    <li
      className={`color-picker ${ cssColorSelected }`}
      id={color.hex}
      onClick={(e) => handle( e, color )}
      style={{ backgroundColor: color.hex }}
    >      
    </li>
  );
}

export default ColorPicker;

ColorPicker.propTypes = {
  color: PropTypes.shape({
    name: PropTypes.string,
    hex: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired
  })
};