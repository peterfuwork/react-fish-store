import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import products from './products';
import messages from './messages';

export default combineReducers({
    products,
    messages,
    form: formReducer
});