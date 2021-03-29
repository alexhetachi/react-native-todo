import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/todosActions';
import { logout } from '../../actions/authActions'
// import { Logout } from '../auth/Logout';
// import { clearErrors } from '../../actions/errorActions';

class AddTodo extends Component {

  state = {
    userid: this.props.user.id,
    todo:'',
    msg:null
  }

//   componentDidUpdate(prevProps){
//     const {error} = this.props;
//     if(error !== prevProps.error){
//       if(error.id ==='ERROR_REVIEW'){
//         this.setState({msg:this.props.error.msg.msg})
//       }else{
//         this.setState({msg:null})
//       }
//     }
//   }

  onTextChange = (name) => (value) => {
    this.setState({ [name]: value });
    // console.log(this.state.name)
  };
  onPress = () => {
    Keyboard.dismiss();
    const newtodo = {
      userid:this.props.user.id,
      todo:this.state.todo,
    };
    console.log(newtodo)
    this.setState({
      userid:this.props.user.id,
      todo:''
    })
    // this.props.reviews.unshift(newreview)
    this.props.addTodo(newtodo) 
    // this.props.clearErrors()
    // this.props.fetchReviews()
  }
    render(){
        return (
            <View style={styles.form}>
              <View style={styles.header}>
              <Text style={styles.hname}>Welcome {this.props.user.name}  </Text>
              <Button onPress={this.props.logout} style={styles.logout} title='Logout'></Button>
              </View>
              <Text style={styles.err}>{this.state.msg}</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Todo'
                    onChangeText={this.onTextChange("todo")}
                    value={this.state.todo}
                    // name="rname"
                />
                <View style={styles.btn}>
                <Button
                    onPress={this.onPress}
                    title='Add Todo'
                    color='coral'
                />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    position:'absolute',
    top:'5%',
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
    // paddingTop: 25,
  },
  hname: {
    fontSize: 20,
    // textAlign:'center',
    // position:'absolute',
    // right: "0%"
  },
  logout: {
    fontSize: 20,
    // textAlign: 'center'
    // position:'absolute',
    // left: "0%"
  },
  form: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFECF9",
    // position:'absolute',
    // top:'0%'
    // marginBottom: 2
  },
  input: {
    width: '70%',
    height: 38,
    fontSize: 18,
    padding: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: "#ddd",
    marginVertical: 5,
    // paddingTop: 10
  },
  btn: {
    width: "70%",
    height: 35,
    marginBottom: 15,
    marginTop: 5,
    // padding: 2,
  },
  err: {
    // padding: 5,
    marginTop: 8,
    fontSize: 15,
    color: 'red',
    fontWeight: 'bold',
  }
});

const mapStateToProps=state=>({
    user:state.auth.user
//   reviews:state.reviews.items,
//   error:state.error
});

export default connect(mapStateToProps, {addTodo, logout} )(AddTodo);
// export default Form;
