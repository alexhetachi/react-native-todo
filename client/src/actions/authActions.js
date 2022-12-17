import { 
    USER_LOADED, 
    USER_LOADING,
    AUTH_ERROR,
    REGESTER_SUCCESS,
    REGESTER_FAIL,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';
import {returnErrors} from './errorActions'
import axios from 'axios';
// import { AsyncStorage } from 'react-native';

export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({type:USER_LOADING})

    //get token from local storage
    const token = getState().auth.token;
    // getState().auth.token.then( token => {
        // console.log('Token hai yeh: '+token)
        // if(token){
            console.log('Token hai yeh: '+token)
        // }
        //headers
        const config = {
            headers:{
                "Contect-type":"application/json"
            }
        }
        if(token){
            config.headers['x-auth-token'] = token;
        }

        axios.get('https://todo-reactnative-server.herokuapp.com/api/login/user', config)
            .then( res => dispatch({
                type:USER_LOADED,
                payload:res.data
            }))
            .catch( err => {
                dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({
                type:AUTH_ERROR
                })
            })
    // })
    // var token;
    // getdata = async () => {
    //     try {
    //       await getState().auth.token
    //       token = getState().auth.token;
    //       console.log("token: "+JSON.stringify(token))
    //     } catch (e) {
    //       // saving error
    //       console.log("err")
    //     }
    //   }

    // console.log(JSON.stringify(token))

    // if(token){
    //     console.log('Token hai yeh: '+JSON.stringify(token))
    // }
    // //headers
    // const config = {
    //     headers:{
    //         "Contect-type":"application/json"
    //     }
    // }
    // if(token){
    //     config.headers['x-auth-token'] = token;
    // }

    // axios.get('/api/login/user', config)
    //     .then( res => dispatch({
    //         type:USER_LOADED,
    //         payload:res.data
    //     }))
    //     .catch( err => {
    //         dispatch(returnErrors(err.response.data, err.response.status))
    //         dispatch({
    //         type:AUTH_ERROR
    //         })
    //     })
}

// Sign up
export const signup = (user) => (dispatch) => {
    console.log('signup')
    axios({
        method: 'post',
        url: 'https://todo-reactnative-server.herokuapp.com/api/signup',
        data: user
      }).then(user => dispatch({
        type:REGESTER_SUCCESS,
        payload:user.data
      })).catch(err => {
        console.log('signup err');
        console.log(err.response.status)
        dispatch(returnErrors(err.response.data, err.response.status,'REGESTER_FAIL'));
        dispatch({
          type:REGESTER_FAIL
      })})
}

//Log out

export const logout = () => {
    return {
        type:LOGOUT_SUCCESS
    }
}

//Login
export const login = (user) => (dispatch) => {
    axios({
        method:'post',
        url:'https://todo-reactnative-server.herokuapp.com/api/login',
        data: user
    }).then(user => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload:user.data
        })
    }).catch(err => {
        console.log(err.response.status)
        dispatch(returnErrors(err.response.data, err.response.status,'LOGIN_FAIL'));
        dispatch({
            type:LOGIN_FAIL
        })
    })
}