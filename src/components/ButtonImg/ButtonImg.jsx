import React from 'react';
import PropTypes from 'prop-types';

import './buttonImg.css';

function ButtonImg({ 
  alt, 
  classNameBtn, 
  classNameImg, 
  cta, 
  handle, 
  img 
}) {

  return (
    <button 
      className={ `button-flex ${ classNameBtn }` } 
      onClick={ handle } >
      
      <div className={ classNameImg }>
        <img 
          src={ img } 
          alt={ alt } 
        />
      </div>

      <p>
        { cta }
      </p>
    </button>
  );
}
  
export default ButtonImg;

ButtonImg.propTypes = {
  cta: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired
};
