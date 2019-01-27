// @flow weak

import React from 'react';
import PropTypes from 'prop-types';

const DefaultPanel = ({
  title,
  children
}) => (
    <section className="panel">
      <header className="panel-heading">
        {title}
      </header>
      <div className="panel-body table-responsive">
        {children}
      </div>
    </section>
  );

DefaultPanel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};

DefaultPanel.defaultProps = {
  title: 'Panel title'
};

export default DefaultPanel;
