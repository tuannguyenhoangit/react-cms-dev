import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FlashMessage from 'react-flash-message';
import {
  Table, TableBody, TableCol, Section,
  RowInput, Form, RowText, TableRow, Breadcrumb, RowDatePicker, Alert
} from '../../../components';
import { routes } from '../../../config/routers';

class EventEditor extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props.location;
    this.isUpdate = data ? true : false;
    this.state = {
      event: {
        authors: [],
        name: '',
        description: '',
        location: '',
        startAt: moment().format('YYYY-MM-DD hh:mm:ss.000Z'),
        endAt: moment().format('YYYY-MM-DD hh:mm:ss.000Z'),
        ...data
      }
    };
  }
  componentDidMount() {
    const { actions: { enterEventEditorView } } = this.props;
    enterEventEditorView();
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    const { actions: { leaveEventEditorView } } = this.props;
    leaveEventEditorView();
    document.removeEventListener('mousedown', this.handleClick);
  }

  listenEvent = (event) => {
    if (event.target.name === 'modalButtonSave') {
      const { actions: { updateEventData, insertEventData } } = this.props;
      if (this.isUpdate) {
        updateEventData(this.state.event);
      } else {
        insertEventData(this.state.event);
      }
    }
  }

  handleClick = (event) => {
    this.listenEvent(event);
  }

  renderUpdateSucces = () => {
    return (
      <Alert type="success">
        <strong>
          Done!
        </strong>
        {' Your change is successfull'}
      </Alert>
    );
  }

  renderInsertSucces = () => {
    return (
      <Alert type="success">
        <strong>
          Done!
        </strong>
        {' New event is added'}
      </Alert>
    );
  }

  renderError = (error) => {
    return (
      <Alert type="danger">
        <strong>
          Sorry!
        </strong>
        {error}
      </Alert>
    );
  }

  flashMessage = () => {
    const { events } = this.props;
    if (events.updated) {
      return (
        <FlashMessage duration={2000}>
          {this.renderUpdateSucces()}
        </FlashMessage>
      );
    }
    if (events.inserted) {
      return (
        <FlashMessage duration={2000}>
          {this.renderInsertSucces()}
        </FlashMessage>
      );
    }
    if (!events.updated && events.error && events.function === 'update') {
      return (
        <FlashMessage duration={2000}>
          {this.renderError(events.error)}
        </FlashMessage>
      );
    }
    if (!events.inserted && events.error && events.function === 'insert') {
      return (
        <FlashMessage duration={2000}>
          {this.renderError(events.error)}
        </FlashMessage>
      );
    }
    return (
      <div />
    );
  }

  onChange = (name, value) => {
    if (name === 'startAt' || name === 'endAt') {
      this.setState({
        event: {
          ...this.state.event,
          [name]: moment(value).format('YYYY-MM-DD hh:mm:ss.000Z')
        }
      });
    } else if (name === 'authors') {
      this.setState({
        event: {
          ...this.state.event,
          [name]: value.split(',')
        }
      });
    } else {
      this.setState({
        event: {
          ...this.state.event,
          [name]: value
        }
      });
    }
  }

  modalUpdateEvent = (title, body) => {
    const { actions: { setModalSave } } = this.props;
    setModalSave(title, body);
  }

  render() {
    const { event } = this.state;
    return (
      <div style={{ height: '100vh' }}>
        <Breadcrumb
          map={['#', routes.EVENT_LIST]}
          path={['Dashboard', 'Event', 'Edior']}
        />
        {this.flashMessage()}
        <Table>
          <TableBody>
            <TableRow>
              <TableCol className="col-md-6">
                <Section
                  linkedModal
                  onClick={() => {
                    if (this.isUpdate) {
                      this.modalUpdateEvent('Save', 'Are you sure to update this event?');
                    } else {
                      this.modalUpdateEvent('Insert', 'Are you sure to insert this event?');
                    }
                  }}
                  icon="fa fa-check"
                  title="Event">
                  <Form>
                    <RowInput
                      defaultValue={event.name}
                      name="name"
                      onChange={(value) => this.onChange('name', value)}
                      title="Name"
                    />
                    <RowInput
                      defaultValue={event.description}
                      onChange={(value) => this.onChange('description', value)}
                      name="description"
                      title="Description"
                    />
                    <RowInput
                      defaultValue={event.location}
                      name="location"
                      onChange={(value) => this.onChange('location', value)}
                      title="Location"
                    />

                    <RowDatePicker
                      defaultValue={moment(event.startAt).format('MM/DD/YYYY hh:mm A')}
                      name="startAt"
                      onChange={(value) => this.onChange('startAt', value)}
                      title="Start At"
                    />

                    <RowDatePicker
                      defaultValue={moment(event.endAt).format('MM/DD/YYYY hh:mm A')}
                      name="endAt"
                      onChange={(value) => this.onChange('endAt', value)}
                      title="End At"
                    />

                    <RowInput
                      defaultValue={event.authors.join(',')}
                      name="authors"
                      onChange={(value) => this.onChange('authors', value)}
                      title="Authors"
                    />
                  </Form>
                </Section>
              </TableCol>
              <TableCol className="col-md-6">
                <Section title="Event review">
                  <Form>
                    <RowText
                      content={event.name}
                      title="Name"
                    />
                    <RowText
                      style={{ marginTop: 10 }}
                      content={event.description}
                      title="Description"
                    />
                    <RowText
                      style={{ marginTop: 10 }}
                      content={event.location}
                      title="Location"
                    />

                    <RowText
                      style={{ marginTop: 10 }}
                      content={moment(event.startAt).format('MM/DD/YYYY hh:mm A')}
                      title="Start at"
                    />

                    <RowText
                      style={{ marginTop: 10 }}
                      content={moment(event.endAt).format('MM/DD/YYYY hh:mm A')}
                      title="End at"
                    />
                    <RowText
                      style={{ marginTop: 10 }}
                      content={event.authors.join(',')}
                      title="Authors"
                    />
                  </Form>
                </Section>
              </TableCol>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

EventEditor.propTypes = {
  location: PropTypes.object,
  actions: PropTypes.any,
  events: PropTypes.object
};


export default EventEditor;
