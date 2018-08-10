import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, arrayInsert } from 'redux-form';
import { Button, Input } from 'reactstrap';
import { fetchServer, loadDataForm, getListMedical } from '../../actions';
import { AcademicFormation } from './AcademicFormation.jsx';
import { InformationPersonal } from './InformationPersonal.jsx';
import { Workplace } from './Workplace.jsx';
import { validate } from './validate';
import { SearchMedical } from '../SearchMedical/SearchMedical.jsx';

// const afterSubmit = (result, dispatch) =>
//   dispatch(reset('designListFormValue'));

class DesignListFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: false,
      selectedOption: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { dispatch } = this.props;
    dispatch(
      arrayInsert(
        'designListFormValue',
        'academic_formation.certifications',
        0,
        '',
      ),
    );
    dispatch(
      arrayInsert(
        'designListFormValue',
        'academic_formation.course_diplomas',
        0,
        '',
      ),
    );
    dispatch(
      arrayInsert('designListFormValue', 'academic_formation.studies', 0, ''),
    );
    dispatch(arrayInsert('designListFormValue', 'work_place', 0, ''));
    this.props.getListMedical();
    this.props.loadData();
  }
  handleChange(e) {
    const { loadData, datos } = this.props;
    const data = datos.dataMedical.filter(
      medic => medic.fullName === e.target.value,
    )[0];
    this.setState({ selectedOption: e.target.value });
    loadData(data);
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      hasHoursValue,
      dispatch,
      initialValues,
      // submitMyForm
    } = this.props;
    const dataMedical = this.props.datos.dataMedical;
    const { selectedOption } = this.state;
    return (
      <div>
        <div>
          <br />
          <br />
          <SearchMedical dataMedical={dataMedical} />
        </div>
        <form onSubmit={handleSubmit(this.props.fetchServer)}>
          <Input
            type="select"
            name="select"
            value={selectedOption}
            onChange={this.handleChange}
          >
            <option> Select one medic </option>
            {dataMedical.map(element => (
              <option key={element.curp} value={element.fullName}>
                {element.fullName}
              </option>
            ))}
          </Input>
          <div className="personal_data">
            <InformationPersonal />
          </div>
          <div>
            <AcademicFormation initialValues={initialValues} />
          </div>
          <div>
            <Workplace
              hasHoursValue={hasHoursValue}
              dispatch={dispatch}
              initialValues={initialValues}
            />
          </div>
          <div className="Submit">
            <Button
              color="success"
              type="submit"
              disabled={pristine || submitting}
            >
              Save
            </Button>
            <Button
              color="primary"
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const DesignListComponentForm = reduxForm({
  form: 'designListFormValue',
  validate,
  // onSubmitSuccess: afterSubmit,
})(DesignListFormComponent);

const mapDispatchToProps = dispatch => ({
  fetchServer: values => dispatch(fetchServer(values)),
  loadData: values => dispatch(loadDataForm(values)),
  getListMedical: () => dispatch(getListMedical()),
});

const mapStateToProps = state => ({
  datos: state.listMedical,
  initialValues: state.account.data,
});

export const DesignListForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DesignListComponentForm);
