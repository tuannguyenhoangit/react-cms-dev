// @flow weak

import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({
  children, className
}) => {
  return (
    className
      ?
      <tr className={className || 'row'}>
        {children}
      </tr>
      :
      <tr>
        {children}
      </tr>
  );
}

TableRow.propTypes = {
  className: PropTypes.any,
  children: PropTypes.node.isRequired
};

export default TableRow;
