import React, { Component } from 'react';
import { connect } from 'react-redux';
import MedicalMap from './MedicalMap.jsx';
import { getListMedical, Week } from '../../actions';

const MedicalRow = ({ children, property }) => (
  <ul>
    <li>{children}</li>
    <li>{property}</li>
  </ul>
);

class MedicalDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.medicalName = this.props.match.params.curp;
  }

  componentDidMount() {
    this.props.getListMedical();
  }

  render() {
    const dataMedical = this.props.datos.dataMedical;
    const medical = dataMedical.filter(
      medic => medic.curp === this.medicalName,
    )[0];

    if (typeof medical === 'undefined') {
      return <h1> {this.medicalName} no es una curp valida. </h1>;
    }
    return (
      <section className="MedicalDetail">
        <div className="MedicalDetail-images">
          <div>
            <img src={medical.img.image_base_64} alt="" width="320" />
          </div>
          {medical.academic_formation && (
            <div>
              {typeof medical.academic_formation.certifications !==
                'undefined' && (
                <div>
                  <h4>Certifications</h4>
                  {medical.academic_formation.certifications.map(
                    certifications => (
                      <div
                        key={certifications.certificate_id}
                        className="MedicalDetail-info"
                      >
                        <MedicalRow property={certifications.event_name}>
                          Event Name
                        </MedicalRow>
                        <MedicalRow property={certifications.start_year}>
                          Start Year
                        </MedicalRow>
                        <MedicalRow property={certifications.end_year}>
                          End Year
                        </MedicalRow>
                        <hr />
                      </div>
                    ),
                  )}
                </div>
              )}
              {typeof medical.academic_formation.course_diplomas !==
                'undefined' && (
                <div className="MedicalDetail-info">
                  <h4>Courses and Diplomados</h4>
                  {medical.academic_formation.course_diplomas.map(
                    coursesAndDiplomas => (
                      <div key={coursesAndDiplomas.certificate_id}>
                        <MedicalRow property={coursesAndDiplomas.event_name}>
                          Event Name
                        </MedicalRow>
                        <MedicalRow property={coursesAndDiplomas.start_year}>
                          Start Year
                        </MedicalRow>
                        <MedicalRow property={coursesAndDiplomas.end_year}>
                          End Year
                        </MedicalRow>
                        <hr />
                      </div>
                    ),
                  )}
                </div>
              )}
              {typeof medical.academic_formation.studies !== 'undefined' && (
                <div className="MedicalDetail-info">
                  <h4>Studies</h4>
                  {medical.academic_formation.studies.map(studies => (
                    <div key={studies.certificate_id}>
                      <MedicalRow property={studies.university}>
                        University
                      </MedicalRow>
                      <MedicalRow property={studies.state}>State</MedicalRow>
                      <MedicalRow property={studies.carrer}>Carrer</MedicalRow>
                      <MedicalRow property={studies.conclusion_year}>
                        Conclusion Year
                      </MedicalRow>
                      <hr />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {medical.work_place && (
            <div>
              <div className="MedicalDetail-info">
                {medical.work_place.map(work_place => (
                  <div key={work_place}>
                    <h4>Work Place</h4>
                    <MedicalRow property={work_place.name}>
                      {' '}
                      Local Name{' '}
                    </MedicalRow>
                    <MedicalRow property={work_place.phone1}>
                      {' '}
                      phone{' '}
                    </MedicalRow>
                    <h4>Horario de Atencion</h4>
                    <MedicalRow property={work_place.attention_hours.type}>
                      type
                    </MedicalRow>

                    <div>
                      {Week.map(days => (
                        <RenderAttentionHours
                          key={days}
                          days={days}
                          medical={medical}
                        />
                      ))}
                    </div>
                    <div>
                      <MedicalMap medical={medical} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="MedicalDetail-info">
          <h4>{medical.fullName}</h4>
          <MedicalRow property={medical.facebook}>facebook</MedicalRow>
          <MedicalRow property={medical.twitter}>Twitter</MedicalRow>
          <MedicalRow property={medical.phone1}>phone1</MedicalRow>
          <MedicalRow property={medical.sex}>Sex</MedicalRow>
        </div>
      </section>
    );
  }
}

const RenderAttentionHours = ({ medical, days }) => (
  <div>
    <div>
      {medical.work_place[0].attention_hours.type === 'schedule' && (
        <div>
          <h4>{days}</h4>
          {medical.work_place[0].attention_hours[days].map(day => (
            <div key={day}>
              <MedicalRow property={day.open}>Open</MedicalRow>
              <MedicalRow property={day.close}>Close</MedicalRow>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  getListMedical: () => dispatch(getListMedical()),
});

const mapStateToProps = state => ({
  datos: state.listMedical,
});

export const MedicalDetail = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MedicalDetailComponent);
