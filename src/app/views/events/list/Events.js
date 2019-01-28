import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventTable from './table';
import { Breadcrumb, Section } from '../../../components';

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
            onItemClick={(row) => {
              history.push({
                pathname: '/Dashboard/event/editor',
                data: row
              });
            }}
            content={events.data} />
        </Section>
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
