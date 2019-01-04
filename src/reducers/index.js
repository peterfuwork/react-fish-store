import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import products from './products';
import messages from './messages';
import users from './users';

export default combineReducers({
    users,
    products,
    messages,
    form: formReducer
});