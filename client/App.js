import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import AuthStack from './src/components/routes/AuthStack';
import {Provider} from 'react-redux';
import store from './src/store';
import {loadUser} from './src/actions/authActions'
import Dashboard from './src/components/dashboard/Dashboard';
// import 'localstorage-polyfill';

class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser())
  }
  
  render() {
    return (
      <Provider store={store}>
          <Dashboard/>
      </Provider>

    );
  }
}

export default App;