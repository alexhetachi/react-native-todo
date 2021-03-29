import { FETCH_TODOS, TODOS_LOADING, TODOS_LOADED, ADD_TODO, } from './types';
import axios from 'axios';
import {returnErrors} from './errorActions'

var x=0,y,z,interval;

export const fetchTodos = (id) => (dispatch, getState) => {

    //get token from local storage
    const token = getState().auth.token;

    //headers
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }
    console.log('Token: '+token)

    if(token){
        config.headers['x-auth-token'] = token;
    
    if(x === 0){
      dispatch({ type:TODOS_LOADING })
    }

    axios.post('https://todo-reactnative-server.herokuapp.com/api/fetchTodos',id,config)
      .then(todos => {
        if(x===0){
            dispatch({ type:TODOS_LOADED })
            dispatch({
                type:FETCH_TODOS,
                payload:todos.data
            })
            x=1;
            y=todos.data.length;
            z=todos.data[0].userid;
        }else if(y !== todos.data.length || z !==todos.data[0].userid){
          // if(z !==todos.data[0].userid){
          //   dispatch({type:TODOS_LOADED})
          // }
          // console.log("y: "+y)
          // console.log("data length: "+todos.data.length)
          // console.log("x: "+x)
                  axios.post('https://todo-reactnative-server.herokuapp.com/api/fetchTodos',id,config)
                    .then(todos => {
                      // dispatch({type:TODOS_LOADED})
                      if(todos.data.length !==0){
                        dispatch({
                          type: FETCH_TODOS,
                          payload: todos.data
                        })
                      }
                  })
                  y=todos.data.length;
                  z=todos.data[0].userid;
        }
      })

    }
      
};

export const addTodo = (todo) => (dispatch, getState) =>{
  //get token from local storage
  const token = getState().auth.token;

  //headers
  const config = {
      headers:{
          "Content-type":"application/json"
      }
  }
  if(token){
      config.headers['x-auth-token'] = token;
  }
  dispatch({ type:ADD_TODO })
  // console.log("inside post")
  axios.post('https://todo-reactnative-server.herokuapp.com/api/addTodo',todo,config)
  .then(todo => {
      console.log(todo.data)
  }).catch(err=>{
  console.log(err.response.status)
  dispatch(returnErrors(err.response.data, err.response.status,'ERROR_TODO'));
//   dispatch({
//     type:REGESTER_FAIL
// })
})
}

// delete Todo
export const deleteTodo = (id) => (dispatch, getState) => {
  //get token from local storage
  const token = getState().auth.token;

  //headers
  const config = {
      headers:{
          "Content-type":"application/json"
      }
  }
  if(token){
      config.headers['x-auth-token'] = token;
  }

  dispatch({ type:'DELETE_TODO' })
  axios.post('https://todo-reactnative-server.herokuapp.com/api/deleteTodo',id,config)
  .then(
        console.log('deleted')
    ).catch(err=>{
    console.log(err.response.status)
    // dispatch(returnErrors(err.response.data, err.response.status,'ERROR_TODO'));
    //   dispatch({
    //     type:REGESTER_FAIL
    // })
    })
}
