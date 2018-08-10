import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import dataReducer from './dataReducer';
import account from './account';

export default combineReducers({
  listMedical: dataReducer,
  form: formReducer,
  account,
});
