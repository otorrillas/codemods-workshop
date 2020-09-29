import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({
  badBoi,
}) => {
 
  return <button>This is the best</button>
}

MyComponent.defaultProps = {
  badBoi: 'blue',
}

MyComponent.propTypes = {
 badBoi: PropTypes.string,
}
