

import React from 'react';
import PropTypes from 'prop-types';

const ButtonIcon = ({ onClick, name, className }) => (
  <button
    className={className}
    onClick={onClick}>
    <i className={name} />
  </button>
);

ButtonIcon.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string
};

ButtonIcon.defaultProps = {
  className: 'btn btn-default btn-xs'
};

export default ButtonIcon;
