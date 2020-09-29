import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({
  badGal,
}) => {

  return <button>This is the best</button>
}

MyComponent.defaultProps = {
  badGal: 'red',
}

MyComponent.propTypes = {
  badGal: PropTypes.string,
}
