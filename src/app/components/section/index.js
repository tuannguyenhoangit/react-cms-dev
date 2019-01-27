import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ title, children }) => (
  <section className="panel">
    <header className="panel-heading">
      {title}
    </header>
    <div className="panel-body">
      {children}
    </div>
  </section>
);

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
};

export default Section;
