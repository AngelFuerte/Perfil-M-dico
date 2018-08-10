import React, { Component } from 'react';
import { Col, Row, Table, Button } from 'reactstrap';
import Select from 'react-select';
import { Field, FieldArray, FormSection } from 'redux-form';
import 'react-select/dist/react-select.css';
import { GalleryDropzoneComponent } from './GalleryDropzoneComponent.jsx';
import { RenderField } from './InformationPersonal.jsx';
import states from '../../data/states.json';
import university from '../../data/university.json';
import specialty from '../../data/specialty.json';

const RenderFormCertificationAndDiplomas = ({
  fields,
  meta: { touched, error, submitFailed },
  label,
}) => (
  <div>
    <h1>
      {label}
      <Button color="success" onClick={() => fields.push({})}>
        +
      </Button>
      {submitFailed && error && <span>{error}</span>}
    </h1>
    {fields.map((type, index) => (
      <div key={'AcademicFormation'}>
        <Table>
          <thead>
            <tr>
              <th> </th>
              <th> </th>
              <th>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    color="danger"
                    onClick={() => fields.remove(index)}
                  >
                    -
                  </Button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="4">
                <center>
                  <Field
                    component={GalleryDropzoneComponent}
                    type="text"
                    name={`${type}.certificate_image_url`}
                    style={{ width: 500, height: 500 }}
                  />
                  {touched && (error && <span>{error}</span>)}
                </center>
              </td>
            </tr>
            <tr>
              <td>
                <Field
                  name={`${type}.event_name`}
                  component={RenderField}
                  type="text"
                  placeholder="Event Name"
                  label="Event Name"
                />
              </td>
              <td />
            </tr>
            <tr>
              <td>
                <Field
                  name={`${type}.start_year`}
                  component={RenderField}
                  type="date"
                  label="Start Year"
                />
              </td>
              <td>
                <Field
                  name={`${type}.end_year`}
                  component={RenderField}
                  type="date"
                  label="Finish Year"
                />
              </td>
            </tr>
            <tr>
              <td>
                <Field
                  name={`${type}.certificate_id`}
                  component={RenderField}
                  type="number"
                  label="Certificate Number"
                />
              </td>
              <td />
            </tr>
          </tbody>
        </Table>
      </div>
    ))}
  </div>
);

class SelectOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
      options: [],
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  UNSAFE_componentWillMount() {
    let inititialvalue;
    if (this.props.input.value !== '') {
      inititialvalue = { label: this.props.input.value };
    }
    this.setState({
      value: inititialvalue,
      options: this.props.list,
    });
  }
  
  handleOnChange(value) {
    this.props.input.onChange(value.label);
    this.setState({ value });
  }

  render() {
    return (
      <div className="section">
        <Select.Creatable
          options={this.state.options}
          onChange={this.handleOnChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

const RenderFormStudies = ({
  fields,
  meta: { touched, error, submitFailed },
  list_university,
  list_specialty,
  list_states,
  initialValues,
}) => (
  <div>
    <h1>
      Studies
      <Button color="success" onClick={() => fields.push({})}>
        +
      </Button>
      {submitFailed && error && <span>{error}</span>}
    </h1>

    {fields.map((studies, index) => {
      let load_studies = {};
      if (initialValues) {
        load_studies = initialValues.academic_formation.studies[index];
      }
      return (
        <div key={'RenderFormStudies'}>
          <Table>
            <thead>
              <tr>
                <th> </th>
                <th> </th>
                <th>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      color="danger"
                      onClick={() => fields.remove(index)}
                    >
                      -
                    </Button>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="5">
                  <center>
                    <Field
                      component={GalleryDropzoneComponent}
                      name={`${studies}.certificate_image_url`}
                      type="text"
                      style={{ width: 300, height: 300 }}
                    />
                    {touched && (error && <span>{error}</span>)}
                  </center>
                </td>
              </tr>
              <tr>
                <td>
                  <Row>
                    <Col>
                      <h6>College Name: </h6>
                    </Col>
                    <Col>
                      <Field
                        name={`${studies}.university`}
                        component={SelectOption}
                        list={list_university}
                        load_studies={load_studies.university}
                      />
                    </Col>
                  </Row>
                </td>
                <td>
                  <Row>
                    <Col>
                      <h6>State: </h6>
                    </Col>
                    <Col>
                      <Field
                        name={`${studies}.state`}
                        component={SelectOption}
                        list={list_states}
                        load_studies={load_studies.state}
                      />
                    </Col>
                  </Row>
                </td>
              </tr>
              <tr>
                <td>
                  <Field
                    name={`${studies}.semester`}
                    component={RenderField}
                    type="number"
                    label="Semester"
                  />
                </td>
                <td>
                  <Row>
                    <Col>
                      <h6>Career: </h6>
                    </Col>
                    <Col>
                      <Field
                        name={`${studies}.carrer`}
                        component={SelectOption}
                        list={list_specialty}
                        load_studies={load_studies.carrer}
                      />
                    </Col>
                  </Row>
                </td>
              </tr>
              <tr>
                <td>
                  <Field
                    name={`${studies}.conclusion_year`}
                    component={RenderField}
                    type="date"
                    label="Year Finish"
                  />
                </td>
                <td>
                  <Field
                    name={`${studies}.level`}
                    component={RenderField}
                    type="number"
                    label="Level"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Field
                    name={`${studies}.certificate_id`}
                    component={RenderField}
                    type="number"
                    label="Certificate Number"
                  />
                </td>
                <td />
              </tr>
            </tbody>
          </Table>
        </div>
      );
    })}
  </div>
);

export const AcademicFormation = ({ initialValues }) => {
  const list_university = university.map(element => ({
    label: element.college,
  }));
  const list_states = states.map(element => ({
    label: element.state,
  }));
  const list_specialty = specialty.map(element => ({
    label: element.specialty,
  }));
  return (
    <div className="AcademicFormation">
      <FormSection name="academic_formation">
        <FieldArray
          name="certifications"
          component={RenderFormCertificationAndDiplomas}
          label="Certifications"
          type="certifications"
        />
        <FieldArray
          name="course_diplomas"
          component={RenderFormCertificationAndDiplomas}
          label="Courses and Diplomas"
          type="course_diplomas"
        />
        <FieldArray
          name="studies"
          component={RenderFormStudies}
          initialValues={initialValues}
          list_university={list_university}
          list_specialty={list_specialty}
          list_states={list_states}
        />
      </FormSection>
    </div>
  );
};
