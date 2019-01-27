// @flow weak

import React from 'react';
import PropTypes from 'prop-types';

const TableCol = ({
  children, className
}) => {
  return (
    className
      ?
      <td className={className}>
        {children}
      </td>
      :
      <td>
        {children}
      </td>
  );
};

TableCol.propTypes = {
  className: PropTypes.any,
  children: PropTypes.node.isRequired
};

export default TableCol;
