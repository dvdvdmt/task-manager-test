import React from 'react';
import PropTypes from 'prop-types';

function Child({text}) {
  return (
    <div data-test="child">
    Child component:
      {text}
    </div>
  );
}

Child.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Child;
