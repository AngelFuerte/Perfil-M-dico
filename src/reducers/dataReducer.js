import {
  FETCHING_SEND_DATA,
  FETCHING_SEND_DATA_SUCCESS,
  FETCHING_SEND_DATA_FAILURE,
  FETCHING_DATA_MEDICAL,
  FETCHING_DATA_MEDICAL_SUCCESS,
  // LOADLOCATION
} from '../constants';

const initialState = {
  data: [],
  dataMedical: [],
  // coordinates: [],
  isFetching: false,
  error: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_SEND_DATA:
      return {
        ...state,
        data: [],
        isFetching: true,
      };
    case FETCHING_SEND_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
      };
    case FETCHING_SEND_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case FETCHING_DATA_MEDICAL:
      return {
        ...state,
        dataMedical: [],
        isFetching: true,
      };
    case FETCHING_DATA_MEDICAL_SUCCESS:
      return {
        ...state,
        dataMedical: action.dataMedical,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default dataReducer;
