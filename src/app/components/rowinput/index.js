import React from 'react';
import PropTypes from 'prop-types';



class RowInput extends React.Component {

  constructor(props) {
    super(props);
    const { defaultValue } = this.props;
    this.state = {
      value: defaultValue || ''
    };
  }


  render() {
    const { title, name, onChange } = this.props;
    return (
      <div className="form-group">
        <label className="col-sm-2 col-sm-2 control-label">
          {title}
        </label>
        <div className="col-sm-9">
          <input
            value={this.state.value}
            name={name}
            onChange={(e) => {
              this.setState({ value: e.target.value });
              onChange(e.target.value);
            }}
            type="text"
            className="form-control"
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
  name: PropTypes.string.isRequired
};

export default RowInput;
