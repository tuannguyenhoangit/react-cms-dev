// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import XDate from 'xdate';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol,
  Label
} from '../../../../components';


const headers = ['#', 'Name', 'Description', 'Location', 'Start At', 'End At', 'Authors', 'Status'];

function handleEventStatus(event) {
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

const EventItem = ({ row, id, onClick }) => {
  const eventStaus = handleEventStatus(row);
  return (
    <TableRow className="row">
      <TableCol>
        <a onClick={() => onClick(row)}>{id + 1}</a>
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
    </TableRow>
  );
};

EventItem.propTypes = {
  id: PropTypes.any,
  row: PropTypes.object,
  onClick: PropTypes.func.isRequired
};

const EventTable = ({ content, onItemClick }) => (
  <Table>
    <TableHeader>
      {
        headers.map(
          (header, headerIdx) => {
            return (
              <TableCol key={headerIdx}>
                {header}
              </TableCol>
            );
          }
        )
      }
    </TableHeader>
    <TableBody>
      {
        content.map(
          (contentRow, contentRowIdx) =>
            (<EventItem
              onClick={onItemClick}
              id={contentRowIdx}
              key={contentRowIdx}
              row={contentRow}
            />)
        )
      }
    </TableBody>
  </Table>
);

EventTable.propTypes = {
  content: PropTypes.array,
  onItemClick: PropTypes.func.isRequired
};

export default EventTable;
