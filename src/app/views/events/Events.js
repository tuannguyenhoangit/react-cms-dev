import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventTable from './components';

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
    const { events } = this.props;
    return (
      <EventTable
        content={events.data} />
    );
  }
}

Events.propTypes = {
  actions: PropTypes.shape({
    enterEventView: PropTypes.func.isRequired,
    leaveEventView: PropTypes.func.isRequired
  }),
  events: PropTypes.object.isRequired
};
export default Events;
