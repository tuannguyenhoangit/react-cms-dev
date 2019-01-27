


import React from 'react';
import PropTypes from 'prop-types';
const Datetime = require('react-datetime');

class RowInput extends React.Component {

  constructor(props) {
    super(props);
    const { defaultValue } = this.props;
    this.state = {
      value: defaultValue || ''
    };
  }


  render() {
    const { title, onChange } = this.props;
    return (
      <div className="form-group">
        <label className="col-sm-2 col-sm-2 control-label">
          {title}
        </label>
        <div className="col-sm-9">
          <Datetime
            onChange={(e) => {
              this.setState({ value: e });
              onChange(e);
            }}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
}


RowInput.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  dateFormat: PropTypes.string
};

export default RowInput;
