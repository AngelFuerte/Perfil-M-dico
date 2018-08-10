import React from 'react';
import { FormGroup, Col, Row, Table, Button } from 'reactstrap';
import { Field, FieldArray } from 'redux-form';
import ComponentMap from './ComponentMap.jsx';
import { RenderField } from './InformationPersonal.jsx';
import { Week, Hours } from '../../actions';

const RenderHours = ({ fields }) => (
  <div>
    {fields.length < 1 && (
      <h1>
        <Button color="success" onClick={() => fields.push({})}>
          +
        </Button>
      </h1>
    )}

    <Row>
      {fields.map((days, index) => (
        <div key={'Hours'}>
          <Row>
            <Col>
              <Field name={`${days}.open`} type="select" component="select">
                {Hours.map(hour => (
                  <option key={`${hour}.addHoursOpen`}>{hour}</option>
                ))}
              </Field>
            </Col>
            <Col>
              <Field name={`${days}.close`} type="select" component="select">
                {Hours.map(hour => (
                  <option key={`${hour}.addHoursClose`}>{hour}</option>
                ))}
              </Field>
            </Col>
            <Col>
              <Button
                type="button"
                color="danger"
                onClick={() => fields.remove(index)}
              >
                -
              </Button>
            </Col>
            <Col>
              {fields.length < 2 && (
                <Button color="success" onClick={() => fields.push({})}>
                  +
                </Button>
              )}
            </Col>
          </Row>
        </div>
      ))}
    </Row>
  </div>
);

class RenderSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (typeof nextProps.initialValues !== 'undefined') {
        if (
          typeof nextProps.initialValues.work_place[nextProps.index] !==
          'undefined'
        ) {
          if (
            nextProps.initialValues.work_place[nextProps.index].attention_hours
              .type === 'schedule'
          ) {
            this.setState({
              selected:
                nextProps.initialValues.work_place[nextProps.index]
                  .attention_hours.type,
            });
          }
        }
      }
    }
  }
  handleChange(e) {
    this.setState({ selected: e.target.value });
  }

  render() {
    const { index, name } = this.props;
    return (
      <div>
        <h1>Schedule</h1>
        <div>
          <FormGroup>
            <Row>
              <Col />
              <Col>
                <h6>Open in specific hours</h6>
              </Col>
              <Col>
                <Field
                  name={`${name}.type`}
                  component="input"
                  type="radio"
                  value="schedule"
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h6>Schedule not Available</h6>
              </Col>
              <Col>
                <Field
                  name={`${name}.type`}
                  component="input"
                  type="radio"
                  value="not_available"
                  onChange={this.handleChange}
                />
              </Col>
              <Col />
            </Row>
            <Row>
              <Col />
              <Col>
                <h6>Always Openned</h6>
              </Col>
              <Col>
                <Field
                  name={`${name}.type`}
                  component="input"
                  type="radio"
                  value="always_openned"
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h6>Always Closed</h6>
              </Col>
              <Col>
                <Field
                  name={`${name}.type`}
                  component="input"
                  type="radio"
                  value="always_closed"
                  onChange={this.handleChange}
                />
              </Col>
              <Col />
            </Row>
          </FormGroup>

          {this.state.selected === 'schedule' &&
            Week.map(day => (
              <div key={`Schedule.${day}`}>
                <Row>
                  <Col>
                    <h6>{day}</h6>
                  </Col>
                  <Col>
                    <FieldArray
                      name={`work_place[${index}].attention_hours.${day}`}
                      component={RenderHours}
                    />
                  </Col>
                </Row>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const RenderLocation = ({ input, load_location, initialValues, index }) => (
  <div>
    <h1>Location</h1>
    <ComponentMap
      input={input}
      load_location={load_location}
      initialValues={initialValues}
      index={index}
    />
  </div>
);

const style = {
  position: 'relative',
  left: '40%',
};

const RenderFormWorkplace = ({
  fields,
  meta: { error, submitFailed },
  hasHoursValue,
  option,
  handleChange,
  dispatch,
  initialValues,
}) => (
  <div>
    <h1>
      Workplace
      <Button color="success" onClick={() => fields.push({})}>
        +
      </Button>
      {submitFailed && error && <span>{error}</span>}
    </h1>
    {fields.map((work_place, index) => {
      let load_location = { lat: 19.689688, lng: -101.170398 };
      if (initialValues) {
        load_location = initialValues.work_place[index].location;
      }
      // console.log(location)
      return (
        <div key={'Workplace'}>
          <Button
            type="button"
            color="danger"
            style={style}
            onClick={() => fields.remove(index)}
          >
            -
          </Button>
          <Table>
            <thead>
              <tr>
                <th> </th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="4" />
              </tr>
              <tr>
                <td>
                  <Field
                    name={`${work_place}.name`}
                    component={RenderField}
                    type="text"
                    placeholder="Local Name"
                    label="Local Name"
                  />
                </td>
                <td>
                  <Row>
                    <h6> Phones: </h6>
                    <Col>
                      <Field
                        name={`${work_place}.phone1`}
                        component={RenderField}
                        type="number"
                        placeholder=""
                      />
                    </Col>
                    <Col>
                      <Field
                        name={`${work_place}.phone2`}
                        component={RenderField}
                        type="number"
                        placeholder=""
                      />
                    </Col>
                  </Row>
                </td>
              </tr>
            </tbody>
          </Table>
          <RenderSchedule
            name={`work_place[${index}].attention_hours`}
            hasHoursValue={hasHoursValue}
            index={index}
            option={option}
            handleChange={handleChange}
            dispatch={dispatch}
            initialValues={initialValues}
          />
          <Field
            name={`work_place[${index}].location`}
            component={RenderLocation}
            type="text"
            load_location={load_location}
            initialValues={initialValues}
            index={index}
          />
        </div>
      );
    })}
  </div>
);

export const Workplace = ({ hasHoursValue, dispatch, initialValues }) => (
  <div className="Workplace">
    <FieldArray
      name="work_place"
      component={RenderFormWorkplace}
      hasHoursValue={hasHoursValue}
      dispatch={dispatch}
      initialValues={initialValues}
    />
  </div>
);
