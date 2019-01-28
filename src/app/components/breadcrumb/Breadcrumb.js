// @flow weak

/* eslint consistent-return: 0 */
import React from 'react';
import PropTypes from 'prop-types';

const Breadcrumb = ({ path, map }) => (
  <ul className="breadcrumb">
    {
      path.length === 0 &&
      <div />
    }
    {
      path.length > 0 &&
      path.map(
        (view, viewIndex) => {
          if (viewIndex === 0) {
            return (
              <li key={viewIndex}>
                <a href="#">
                  <i className="fa fa-home" />
                  &nbsp;
                  {view}
                </a>
              </li>
            );
          }
          if (viewIndex < path.length - 1) {
            return (
              <li
                key={viewIndex}
                className="active">
                {map ?
                  (
                    <a href={`#${map[viewIndex]}`}>
                      {view}
                    </a>
                  ) : view}
              </li>
            );
          }
          if (viewIndex === path.length - 1) {
            return (
              <li key={viewIndex}
                className="active">
                {view}
              </li>
            );
          }
        }
      )
    }
  </ul>
);

Breadcrumb.propTypes = {
  path: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  map: PropTypes.array
};

export default Breadcrumb;
