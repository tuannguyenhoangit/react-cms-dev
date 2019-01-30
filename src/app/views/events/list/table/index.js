// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableHeader,
  TableBody,
  TableCol
} from '../../../../components';
import EventItem from './item';

const headers = ['#', 'Name', 'Description', 'Location', 'Start At', 'End At', 'Authors', 'Status', 'Action'];


const EventTable = ({ content, onItemClick, onItemDelete }) => (
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
              onDelete={onItemDelete}
              onClick={onItemClick}
              id={contentRowIdx}
              key={contentRow.id}
              row={contentRow}
            />)
        )
      }
    </TableBody>
  </Table>
);

EventTable.propTypes = {
  onItemDelete: PropTypes.func.isRequired,
  content: PropTypes.array,
  onItemClick: PropTypes.func.isRequired
};

export default EventTable;
