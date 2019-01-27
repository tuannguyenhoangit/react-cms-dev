import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ title, children, icon, onClick }) => (
  <section className="panel">
    <header className="panel-heading" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      {title}
      {icon
        ? <i className={icon} onClick={onClick} /> : <div />
      }
    </header>
    <div className="panel-body">
      {children}
    </div>
  </section >
);

Section.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.any
};

export default Section;
