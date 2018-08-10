const token =
  'sAooksCJPatp3oLVRTYbC5C4j8mgwMwD~1fQaWq~ipVzM8qx2Shmrhze610Hf3KaGpE';
const baseUrl = 'https://galleries-sandbox-api.dubalu.io/';
const identityID = '~FgT5c4D56wq';
const galeryID = '~FgT5c4D56wq';
// const query  = "/?resizetofit.width=200&resizetofit.height=200&resizetofit.upscale=true&_format=jpeg&page_size=5"
const finalUrl = `${baseUrl}${identityID}:${galeryID}/`;

export const loadDataForm = data => ({
  type: 'LOAD',
  data,
});

export const ADD_IMAGE = 'ADD_IMAGE';

export const sendData = () => ({
  type: 'FETCHING_SEND_DATA',
});

export const sendDataSuccess = data => ({
  type: 'FETCHING_SEND_DATA_SUCCESS',
  data,
});

// export const loadLocation = coordinates => {
// 	return (
// 			type: "LOADLOCATION",
// 			coordinates
// 		)
// }

export const sendDataFailure = () => ({
  type: 'FETCHING_SEND_DATA_FAILURE',
});

// SEARCH
const URListMedical =
  'https://api.mlab.com/api/1/databases/pefil_medico/collections/schedule?apiKey=F7xS8Hqd6CSMW2cKHky8weMVpRGhIdue';

export const getDataMedical = () => ({
  type: 'FETCHING_DATA_MEDICAL',
});

export const getDataMedicalSuccess = dataMedical => ({
  type: 'FETCHING_DATA_MEDICAL_SUCCESS',
  dataMedical,
});

const ListMedical = () =>
  fetch(URListMedical).then(response =>
    Promise.all([response, response.json()]),
  );

export const Week = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const Hours = [
  ' ',
  '07:00 am',
  '07:30 am',
  '08:00 am',
  '08:30 am',
  '09:00 am',
  '09:30 am',
  '10:00 am',
  '10:30 am',
  '11:00 am',
  '11:30 am',
  '12:00 pm',
  '12:30 pm',
  '01:00 pm',
  '01:30 pm',
  '02:00 pm',
  '02:30 pm',
  '03:00 pm',
  '03:30 pm',
  '04:00 pm',
  '04:30 pm',
  '05:00 pm',
  '05:30 pm',
  '06:00 pm',
  '06:30 pm',
  '07:00 pm',
  '07:30 pm',
  '08:00 pm',
  '08:30 pm',
  '09:00 pm',
  '09:30 pm',
  '10:00 pm',
  '10:30 pm',
  '11:00 pm',
  '11:30 pm',
];

export const addImage = img => ({
  type: ADD_IMAGE,
  payload: img,
});

export const uploadImage = (
  data,
  callbackSuccess,
  callbackError,
) => dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  const req = new Request(finalUrl, options);

  fetch(req)
    .then(response => {
      if (response.ok) {
        if (callbackSuccess) {
          callbackSuccess();
        }
        response.json();
      }
    })
    .then(body => {
      dispatch(addImage(body));
    })
    .catch(error => {
      if (callbackError) {
        callbackError();
      }
      console.log(error);
    });
};

export const fetchServer = values => dispatch => {
  dispatch(sendData());
  fetch(
    `https://api.mlab.com/api/1/databases/pefil_medico/collections/schedule/${JSON.stringify(
      values.curp,
    ).replace(/['"]+/g, '')}/?apiKey=F7xS8Hqd6CSMW2cKHky8weMVpRGhIdue`,
    {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then(response => response.json())
    .then(json => sendDataSuccess(json));
};

export const getListMedical = () => dispatch => {
  dispatch(getDataMedical());
  ListMedical()
    .then(([response, json]) => {
      dispatch(getDataMedicalSuccess(json));
    })
    .catch(err => console.log(err));
};
