import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventTable from './table';
import { Breadcrumb, Section, Pagination } from '../../../components';
import { deleteEventData } from '../../../services/API/events';
import { routes } from '../../../config/routers';

class Events extends Component {
  componentWillMount() {
    const { actions: { enterEventView, fetchEventDataIfNeeded } } = this.props;
    enterEventView();
    fetchEventDataIfNeeded();
  }

  componentDidMount() {
    const { actions: { leaveEventView } } = this.props;
    leaveEventView();
  }

  deleteItem = (row) => {
    deleteEventData(row).then((response) => {
      if (response.count) {
        const { actions: { deleteEventItem } } = this.props;
        deleteEventItem(row);
      }
    });
  }

  render() {
    const { events, history } = this.props;
    return (
      <div>
        <Breadcrumb
          path={['Dashboard', 'Event']}
        />
        <Section
          onClick={() => {
            history.push({
              pathname: '/Dashboard/event/editor',
              data: null
            });
          }}
          title="Events"
          icon="fa fa-plus"
        >
          <EventTable
            onItemDelete={this.deleteItem}
            onItemClick={(row) => {
              history.push({
                pathname: '/Dashboard/event/editor',
                data: row
              });
            }}
            content={events.data} />
          <div className="text-center">
            <Pagination
              route={routes.EVENT_LIST}
              size="small"
              numberOfPagination={5}
            />
          </div>
        </Section>

      </div >
    );
  }
}

Events.propTypes = {
  actions: PropTypes.shape({
    enterEventView: PropTypes.func.isRequired,
    leaveEventView: PropTypes.func.isRequired
  }),
  events: PropTypes.object.isRequired,
  history: PropTypes.object
};
export default Events;
