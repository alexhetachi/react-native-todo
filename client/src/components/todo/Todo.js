import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AddTodo from './AddTodo';
import ShowTodos from './ShowTodos';
// import Logout from '../auth/Logout'

class Todo extends Component {
  
  render() {
    return (
      <View style={styles.header}>
          <AddTodo/>
          <ShowTodos/>
          {/* <Logout/> */}
      </View>

    );
  }
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    }
})

export default Todo;