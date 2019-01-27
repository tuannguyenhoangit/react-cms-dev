import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ children }) => (
  <form
    className="form-horizontal tasi-form"
    method="get">
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.any
};

export default Form;
