import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import {connect} from 'react-redux';
import { fetchTodos, deleteTodo } from '../../actions/todosActions';

class ShowTodos extends Component {

  state={
    id:this.props.user.id,
  }

    // componentDidMount(){
    //   var id = this.state.id;
    //   // console.log(id)
    //   // if(id){
    //   //   console.log(id)
    //   //   this.props.fetchTodos({id})
    //   //   setInterval(
    //   //     () => {var id2 = this.props.user.id; this.props.fetchTodos({id2})},
    //   //     5000
    //   //   );
    //   //   }
    //   var clear = this.props.fetchTodos({id})
    //   setInterval(() => {
    //     this.props.fetchTodos({id})
    //     if (!this.props.isAuthenticated) {
    //       clearInterval(clear);
    //     }
    //   }, 3000);
    //   }
    componentDidMount(){
      const id = this.state.id
      this.props.fetchTodos({id})
      interval = setInterval(
        () => {
          console.log(id)
          this.props.fetchTodos({id})
        },
        1000
      );
    }
    
    componentWillUnmount(){
      clearInterval(interval)
    }

  // componentDidUpdate(prevProps){
  //   const isAuthenticated = this.props.isAuthenticated;
  //   const id = this.props.user.id
  //   console.log("didupdate: "+isAuthenticated)
  //   console.log("prevprops: "+prevProps.isAuthenticated)
  //   if(isAuthenticated === prevProps.isAuthenticated){
  //     this.props.fetchTodos({id})
  //   }
  // }

  //del function
    del = (id) => {
      console.log('Pressed: '+id)
      this.props.deleteTodo({id})
    }

    render(){

        const todosItems = this.props.todos.map(({ _id, todo }) => (
            <View style={styles.todo} key={_id}>
                <Text style={styles.todoTodo}>{todo}</Text>
                <Text style={styles.del} onPress={()=>{this.del(_id)}}>X</Text>
                {/* <Text style={styles.reviewName}>-By {name}</Text> */}
            </View>
          )
            
        );

        return (
          // <View>
            <ScrollView>
              <View style={styles.todos}>
                  <Text style={styles.todosdiscp}>
                      Todo List
                  </Text>
                  {/* {reviewsItems} */}
                  {this.props.todosLoading?<View><Text>Loading...</Text></View>:todosItems}
                  <Text>{'\n'}</Text>
                  <Text>{'\n'}</Text>
                  {/* <View style={styles.review}>
                      <Text style={styles.reviewReview}>Review</Text>
                      <Text style={styles.reviewName}>-By name</Text>
                  </View>
                  <View style={styles.review}>
                      <Text style={styles.reviewReview}>Review</Text>
                      <Text style={styles.reviewName}>-By name</Text>
                  </View> */}
              </View>
            </ScrollView>
            // </View>
        );
    }

}

const styles = StyleSheet.create({
  todos: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#eee",
    marginTop: 15
  },
  todosdiscp: {
    // width: '70%',
    padding: 5,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5
  },
  todo: {
    width: 300,
    padding: 8,
    // fontSize: 18,
    borderWidth: 1.5,
    borderColor: "#ddd",
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection:'row'
  },
  todoTodo: {
    fontSize: 22,
    color: '#3D3C3A',
    // textAlign: 'center'
  },
  del: {
    padding: 8,
    position:'absolute',
    right: 4,
    // textAlign: 'right',
    color:'red',
    fontSize: 22,
    fontWeight: 'bold'
  }
  // todoName: {
  //   fontSize: 15,
  //   color: '#6D6968'
  // }
});

const mapStateToProps=state=>({
    user:state.auth.user,
    todos:state.todos.items,
    todosLoading:state.todos.todosLoading,
    isAuthenticated:state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { fetchTodos,deleteTodo })(ShowTodos);
// export default ShowReviews;
