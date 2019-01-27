// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import XDate from 'xdate';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol
} from '../../../components';
import DefaultPanel from '../../../components/defaultPanel';

const headers = ['#', 'Name', 'Description', 'Location', 'Start At', 'End At', 'Authors'];

const EventItem = ({ row, id }) => (
  <TableRow className="row">
    <TableCol>
      {id + 1}
    </TableCol>
    <TableCol className="col-md-2">
      {row.name}
    </TableCol>
    <TableCol className="col-md-4">
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
    <TableCol className="col-md-3">
      {row.authors.map(name => name)}
    </TableCol>
  </TableRow>
);

EventItem.propTypes = {
  id: PropTypes.any,
  row: PropTypes.object
};

const EventTable = ({ content }) => (
  <DefaultPanel>
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
                id={contentRowIdx}
                key={contentRowIdx}
                row={contentRow}
              />)
          )
        }
      </TableBody>
    </Table>
  </DefaultPanel>
);

EventTable.propTypes = {
  content: PropTypes.array
}

export default EventTable;
