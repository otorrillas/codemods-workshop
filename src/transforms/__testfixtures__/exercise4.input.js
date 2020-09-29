import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({
  badBoi,
  badGal,
}) => {

  return <button>This is the best</button>
}

MyComponent.defaultProps = {
  badBoi: 'blue',
  badGal: 'red',
}

MyComponent.propTypes = {
 badBoi: PropTypes.string,
 badGal: PropTypes.string,
}
