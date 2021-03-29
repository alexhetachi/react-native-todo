import { 
    USER_LOADED, 
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGESTER_SUCCESS,
    REGESTER_FAIL,
} from '../actions/types';

import { AsyncStorage } from 'react-native';

const initialState={
    // token: localStorage.getItem('token'),
    token: AsyncStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    // user: localStorage.getItem('user'),
    user: AsyncStorage.getItem('user')

}
export default function(state=initialState,action){
    switch(action.type){
        case USER_LOADING:
            // AsyncStorage.removeItem('token');
            // AsyncStorage.setItem('token')
            // localStorage.setItem('token')
        return {
            ...state,
            isLoading: true
        };
        case USER_LOADED:
        // localStorage.setItem('user', action.payload)
        AsyncStorage.setItem('user', action.payload)
        return {
            ...state,
            isAuthenticated:true,
            isLoading: false,
            user:action.payload
        };
        case LOGIN_SUCCESS:
        case REGESTER_SUCCESS:
        // localStorage.setItem('token', action.payload.token)
        AsyncStorage.setItem('token', action.payload)
        return {
            ...state,
            ...action.payload,
            isAuthenticated:true,
            isLoading: false,
        };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGESTER_FAIL:
        // localStorage.removeItem('token');
        // localStorage.removeItem('user');
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('user');
        return{
            ...state,
            token:null,
            user:null,
            isAuthenticated:false,
            isLoading:false,
        }

        default:
        return state;
    };
}