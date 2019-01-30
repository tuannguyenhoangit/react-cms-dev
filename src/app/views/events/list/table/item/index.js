import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XDate from 'xdate';
import {
  TableRow,
  TableCol,
  Label,
  ButtonIcon
} from '../../../../../components';
export default class EventItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  handleEventStatus = (event) => {
    let eventStaus = {
      type: '',
      status: ''
    };
    const toDate = new XDate().getTime();
    if (toDate < new XDate(event.startAt).getTime()) {
      eventStaus = {
        type: 'warning',
        status: 'Pending'
      };
    }
    if (new XDate(event.startAt).getTime() < toDate && toDate < new XDate(event.endAt).getTime()) {
      eventStaus = {
        type: 'success',
        status: 'Running'
      };
    }
    if (new XDate(event.endAt).getTime() < toDate) {
      eventStaus = {
        type: 'danger',
        status: 'End'
      };
    }
    return eventStaus;
  }


  render() {
    const { row, onClick, id, onDelete } = this.props;
    const { editing } = this.state;
    const eventStaus = this.handleEventStatus(row);
    return (
      <TableRow className="row">
        <TableCol>
          <a href="#/Dashboard/event/editor" onClick={() => onClick(row)}>{id + 1}</a>
        </TableCol>
        <TableCol className="col-md-2">
          {row.name}
        </TableCol>
        <TableCol className="col-md-3">
          {row.description}
        </TableCol>
        <TableCol className="col-md-2">
          {row.location}
        </TableCol>
        <TableCol className="col-md-1">
          {new XDate(row.startAt).toString('HH:mm, dd/MM/yyyy')}
        </TableCol>
        <TableCol className="col-md-1">
          {new XDate(row.endAt).toString('HH:mm, dd/MM/yyyy')}
        </TableCol>
        <TableCol className="col-md-2">
          {row.authors.map(name => name)}
        </TableCol>
        <TableCol className="col-md-1">
          <Label type={`${eventStaus.type}`} text={eventStaus.status} />
        </TableCol>
        <TableCol>
          {editing
            ? (
              <div style={{ flexDirection: 'row', display: 'flex' }}>
                <ButtonIcon
                  onClick={() => onDelete(row)}
                  className="btn btn-danger btn-xs"
                  name="fa fa-check"
                />
                <ButtonIcon
                  onClick={() => this.setState({ editing: false })}
                  name="fa fa-times"
                />
              </div>
            ) : (
              <div style={{ flexDirection: 'row', display: 'flex' }}>
                <ButtonIcon
                  onClick={() => onClick(row)}
                  name="fa fa-pencil"
                />
                <ButtonIcon
                  onClick={() => this.setState({ editing: true })}
                  name="fa fa-trash"
                />
              </div>
            )}

        </TableCol>
      </TableRow>
    )
  }
}

EventItem.propTypes = {
  onDelete: PropTypes.func,
  row: PropTypes.object,
  id: PropTypes.number,
  onClick: PropTypes.func
};
