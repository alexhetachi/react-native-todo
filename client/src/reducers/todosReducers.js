import { FETCH_TODOS, TODOS_LOADING, TODOS_LOADED,REGESTER_FAIL,LOGOUT_SUCCESS,AUTH_ERROR,LOGIN_FAIL } from '../actions/types';

const initialState={
    items:[],
    todosLoading: false
}
export default function(state=initialState,action){
    switch(action.type){
        case TODOS_LOADING:
        return{
            ...state,
            todosLoading:true
            }
        case TODOS_LOADED:
        return{
            ...state,
            todosLoading:false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGESTER_FAIL:
        return{
            ...state,
            // todosLoading:true,
            items:[]
            }
        case FETCH_TODOS:
        // localStorage.removeItem('price')
        return {
            ...state,
            items:action.payload
        };
        default:
        return state;
    };
}