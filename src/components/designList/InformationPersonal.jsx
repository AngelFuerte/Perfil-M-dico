import React from 'react';
import { Col, Row, Table } from 'reactstrap';
import { Field } from 'redux-form';
import { GalleryDropzoneComponent } from './GalleryDropzoneComponent.jsx';

const required = value => (value ? null : 'Required');
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : null;

const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : null;

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters` : null;
const maxLength18 = maxLength(18);

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters` : null;
const minLength18 = minLength(18);
const maxLength12 = maxLength(13);
const minLength12 = minLength(12);
const maxLength200 = maxLength(200);
const minLength50 = minLength(50);

export const RenderField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <Row>
      <Col>
        <h6>{label}</h6>
      </Col>
      <Col>
        <div>
          <input {...input} type={type} placeholder={placeholder} />
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </Col>
    </Row>
  </div>
);

const RenderFieldTextarea = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <Row>
      <Col>
        <h6>{label}</h6>
      </Col>
      <Col>
        <div>
          <textarea {...input} placeholder={label} type={type} />
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </Col>
    </Row>
  </div>
);

export const InformationPersonal = () => (
  <div className="InformationPersonal">
    <div>
      <h1>Information Personal </h1>
    </div>
    <div>
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
            <td rowSpan="6">
              {' '}
              <Field
                name="img"
                component={GalleryDropzoneComponent}
                type="text"
              />{' '}
            </td>
          </tr>
          <tr>
            <td>
              <Field
                name="fullName"
                component={RenderField}
                type="text"
                placeholder="Full Name"
                label="Full Name"
                validate={required}
              />
            </td>
            <td>
              <Field
                name="facebook"
                component={RenderField}
                label="Facebook"
                type="text"
                placeholder=""
              />
            </td>
          </tr>
          <tr>
            <td>
              <Field
                name="email"
                component={RenderField}
                type="email"
                placeholder="Email"
                label="Email"
                validate={[required, email]}
              />
            </td>
            <td>
              <Field
                name="twitter"
                component={RenderField}
                type="text"
                placeholder=""
                label="Twitter"
              />
            </td>
          </tr>
          <tr>
            <td>
              <Field
                name="rfc"
                component={RenderField}
                type="text"
                placeholder=""
                label="RFC"
                validate={[required, maxLength12, minLength12]}
              />
            </td>
            <td>
              <Field
                name="curp"
                component={RenderField}
                type="text"
                placeholder=""
                label="CURP"
                validate={[required, maxLength18, minLength18]}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Field
                name="birthday"
                component={RenderField}
                type="date"
                label="Birthday"
                validate={required}
              />
            </td>
            <td>
              <Field
                name="linkedin"
                component={RenderField}
                type="text"
                placeholder=""
                label="Linkedin"
              />
            </td>
          </tr>
          <tr>
            <td>
              <Row>
                <Col>
                  <h6>Sex: </h6>
                </Col>
                <Col>
                  <Field
                    name="sex"
                    component={RenderField}
                    type="radio"
                    value="man"
                    label="Man"
                    validate={required}
                  />
                </Col>
                <Col>
                  <Field
                    name="sex"
                    component={RenderField}
                    type="radio"
                    value="woman"
                    label="Woman"
                    validate={required}
                  />
                </Col>
              </Row>
            </td>
            <td />
          </tr>
          <tr>
            <td>
              <Field
                name="phone1"
                component={RenderField}
                type="number"
                label="Phone"
                validate={[required, phoneNumber]}
              />
            </td>
            <td>
              <Field
                name="phone2"
                component={RenderField}
                type="number"
                label="Phone2"
                validate={phoneNumber}
              />
            </td>
            <td>
              <Field
                name="fhilosophy"
                component={RenderFieldTextarea}
                validate={[maxLength200, minLength50]}
                label="Fhilosophy"
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  </div>
);
