import React from 'react';
// import PropTypes from 'prop-types';

import '../../styles/button.css';

function Button({ 
  classNameBtn, 
  cta, 
  handle
}) {

  return (
    <button 
    className={`button ${ classNameBtn }`}
    onClick={ handle }
  >
  { cta }
  </button>
  );
}
  
export default Button;

//   Button.propTypes = {
//     cta: PropTypes.string.isRequired,
//     handle: PropTypes.func.isRequired
// }
