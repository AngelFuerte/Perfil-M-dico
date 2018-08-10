export const validate = values => {
  const errors = {};
  if (!values.work_place || !values.work_place.length) {
    errors.work_place = { _error: 'At least one work_place must be entered' };
  } else {
    const work_placeArrayErrors = [];
    values.work_place.forEach((work_places, work_placeIndex) => {
      const work_placeErrors = {};
      if (!work_places || !work_places.name) {
        work_placeErrors.name = 'Required';
        work_placeArrayErrors[work_placeIndex] = work_placeErrors;
      }
      if (!work_places || !work_places.phone1) {
        work_placeErrors.phone1 = 'Required';
        work_placeArrayErrors[work_placeIndex] = work_placeErrors;
      } else if (!/^(0|[1-9][0-9]{9})$/i.test(work_places.phone1)) {
        work_placeErrors.phone1 = 'Invalid phone number, must be 10 digits';
      }
      if (!work_places || !work_places.phone2) {
        work_placeArrayErrors[work_placeIndex] = work_placeErrors;
      } else if (!/^(0|[1-9][0-9]{9})$/i.test(work_places.phone2)) {
        work_placeErrors.phone2 = 'Invalid phone number, must be 10 digits';
      }
    });
    if (work_placeArrayErrors.length) {
      errors.work_place = work_placeArrayErrors;
    }
  }
  if (values.academic_formation && !values.academic_formation.length) {
    errors.academic_formation = {
      _error: 'At least one of the 3 must have at least',
    };
    if (
      values.academic_formation &&
      (!values.academic_formation.studies ||
        !values.academic_formation.studies.length)
    ) {
      errors.academic_formation.studies = {
        _error: 'At least one studies must be entered',
      };
    } else if (values.academic_formation && values.academic_formation.studies) {
      const studiesArrayErrors = [];
      values.academic_formation.studies.forEach((studie, studieIndex) => {
        const studiesErrors = {};
        if (!studie || !studie.university) {
          studiesErrors.university = 'Required';
          studiesArrayErrors[studieIndex] = studiesErrors;
        }
        if (!studie || !studie.state) {
          studiesErrors.state = 'Required';
          studiesArrayErrors[studieIndex] = studiesErrors;
        }
        if (!studie || !studie.semester) {
          studiesErrors.semester = 'Required';
          studiesArrayErrors[studieIndex] = studiesErrors;
        }
        if (!studie || !studie.carrer) {
          studiesErrors.carrer = 'Required';
          studiesArrayErrors[studieIndex] = studiesErrors;
        }
        if (!studie || !studie.conclusion_year) {
          studiesErrors.conclusion_year = 'Required';
          studiesArrayErrors[studieIndex] = studiesErrors;
        }
        if (!studie || !studie.level) {
          studiesErrors.level = 'Required';
          studiesArrayErrors[studieIndex] = studiesErrors;
        }
        if (!studie || !studie.certificate_id) {
          studiesErrors.certificate_id = 'Required';
          studiesArrayErrors[studieIndex] = studiesErrors;
        }
      });
      if (studiesArrayErrors.length) {
        errors.academic_formation = {};
        errors.academic_formation.studies = studiesArrayErrors;
      }
    }

    if (
      values.academic_formation &&
      (!values.academic_formation.course_diplomas ||
        !values.academic_formation.course_diplomas.length)
    ) {
//       if (!values.academic_formation.course_diplomas.length) {
//         errors.academic_formation.course_diplomas = {
//           _error: 'At least one Course or Diplomas must be entered',
//         };
//       }
    } else if (
      values.academic_formation &&
      values.academic_formation.course_diplomas
    ) {
      const coursesArrayErrors = [];
      values.academic_formation.course_diplomas.forEach((cours, coursIndex) => {
        const coursErrors = {};
        if (!cours || !cours.event_name) {
          coursErrors.event_name = 'Required';
          coursesArrayErrors[coursIndex] = coursErrors;
        }
        if (!cours || !cours.start_year) {
          coursErrors.start_year = 'Required';
          coursesArrayErrors[coursIndex] = coursErrors;
        }
        if (!cours || !cours.end_year) {
          coursErrors.end_year = 'Required';
          coursesArrayErrors[coursIndex] = coursErrors;
        }
        // if (cours.end_year <= cours.start_year) {
        //   alert("End date should be greater than Start date")
        // }
        if (!cours || !cours.certificate_id) {
          coursErrors.certificate_id = 'Required';
          coursesArrayErrors[coursIndex] = coursErrors;
        }
      });
      if (coursesArrayErrors.length) {
        errors.academic_formation = {};
        errors.academic_formation.course_diplomas = coursesArrayErrors;
      }
    }

    if (
      values.academic_formation &&
      (!values.academic_formation.certifications ||
        !values.academic_formation.certifications.length)
    ) {
//       if (!values.academic_formation.certifications.length) {
//         errors.academic_formation.certifications = {
//           _error: 'At least one Certifications must be entered',
//         };
//       }
    } else if (
      values.academic_formation &&
      values.academic_formation.certifications
    ) {
      const certificationsArrayErrors = [];
      values.academic_formation.certifications.forEach((cert, certIndex) => {
        const certErrors = {};
        if (!cert || !cert.event_name) {
          certErrors.event_name = 'Required';
          certificationsArrayErrors[certIndex] = certErrors;
        }
        if (!cert || !cert.start_year) {
          certErrors.start_year = 'Required';
          certificationsArrayErrors[certIndex] = certErrors;
        }
        if (!cert || !cert.end_year) {
          certErrors.end_year = 'Required';
          certificationsArrayErrors[certIndex] = certErrors;
        }
        if (!cert || !cert.certificate_id) {
          certErrors.certificate_id = 'Required';
          certificationsArrayErrors[certIndex] = certErrors;
        }
      });
      if (certificationsArrayErrors.length) {
        errors.academic_formation = {};
        errors.academic_formation.certifications = certificationsArrayErrors;
      }
    }
  }
  return errors;
};
