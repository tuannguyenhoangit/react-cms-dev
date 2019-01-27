import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventTable from './table';
import { Breadcrumb } from '../../../components';

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


  render() {
    const { events, history } = this.props;
    return (
      <div>
        <Breadcrumb
          path={['Dashboard', 'Event']}
        />
        <EventTable
          onItemClick={(row) => {
            history.push({
              pathname: '/Dashboard/event/editor',
              data: row
            });
          }}
          content={events.data} />
      </div>
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
