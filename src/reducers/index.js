import {combineReducers} from 'redux';
import todosReducers from './todosReducers';
import errorReducers from './errorReducers';
import authReducers from './authReducers';

export default combineReducers({
    todos:todosReducers,
    error:errorReducers,
    auth:authReducers
});