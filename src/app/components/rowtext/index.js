import React from 'react';
import PropTypes from 'prop-types';

const RowText = ({ title, content, style }) => (
  <div style={style}>
    <label>
      {title}
    </label>
    <div>
      {content}
    </div>
  </div>
);


RowText.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  style: PropTypes.object
};

RowText.defaultPops = {

};

export default RowText;
