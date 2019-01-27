import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Table, TableBody, TableCol, Section,
  RowInput, Form, RowText, TableRow, Breadcrumb, RowDatePicker
} from '../../../components';

class EventEditor extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props.location;
    this.state = {
      event: {
        authors: [],
        name: '',
        description: '',
        location: '',
        ...data
      }
    };
  }
  onChange = (name, value) => {
    if (name === 'authors') {
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

  render() {
    const { event } = this.state;
    return (
      <div style={{ height: '100vh' }}>
        <Breadcrumb
          path={['Dashboard', 'Event', 'Edior']}
        />
        <Table>
          <TableBody>
            <TableRow>
              <TableCol className="col-md-6">
                <Section title="Event">
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
                      defaultValue={moment(event.startAt).format('DD/MM/YYYY hh:mm A')}
                      name="startAt"
                      onChange={(value) => this.onChange('startAt', value)}
                      title="Start At"
                    />

                    <RowDatePicker
                      defaultValue={moment(event.endAt).format('DD/MM/YYYY hh:mm A')}
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
                      content={moment(event.startAt).format('DD/MM/YYYY hh:mm A')}
                      title="Start at"
                    />

                    <RowText
                      style={{ marginTop: 10 }}
                      content={moment(event.endAt).format('DD/MM/YYYY hh:mm A')}
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
  location: PropTypes.object
};


export default EventEditor;
