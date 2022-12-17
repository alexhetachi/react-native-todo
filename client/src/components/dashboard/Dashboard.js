import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthStack from '../routes/AuthStack';
import TodoStack from '../routes/TodoStack';
// import { StyleSheet, View, Text } from 'react-native';

class Dashboard extends Component {
  
  render() {
    return (
        this.props.isAuthenticated?<TodoStack/>:<AuthStack/>
    );
  }
}

const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated,
  });
  
export default connect(mapStateToProps, { } )(Dashboard);
// export default Dashboard;