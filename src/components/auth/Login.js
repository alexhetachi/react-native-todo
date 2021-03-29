import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class Login extends Component {
  
  state = {
    email:"",
    password:"",
    msg:null,
  }

  componentDidUpdate(prevProps){
    const {error} = this.props;
    if(error !== prevProps.error){
      if(error.id ==='LOGIN_FAIL'){
        this.setState({msg:this.props.error.msg.msg})
      }else{
        this.setState({msg:null})
      }
    }
  }

  onTextChange = (name) => (value) => {
    this.setState({ [name]: value });
    // console.log(this.state.name)
  };
  onPress = () => {
    const { email, password } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const User = {
      email,
      password
    };
    if( !email || !password ){
      this.setState({ msg:'Please enter all fields.' })
    }else if(password.trim()===''){
      this.setState({ msg:'Please enter all fields.' })
    }else if(reg.test(email) === false){
      this.setState({ msg:'Invaild email.' })
    }else{
      this.setState({ msg:'' })
      console.log(User)
      // this.setState({
      //   name:"",
      //   review:""
      // })
      this.props.login(User) 
      this.props.clearErrors()
    }

    // console.log(User)
    // // this.setState({
    // //   name:"",
    // //   review:""
    // // })
    // this.props.login(User) 
    // this.props.clearErrors()
  }

  pressHendeler =()=>{
    this.props.navigation.navigate('SignUp')
   }

  render(){
    return (
      <View style={styles.main}>
          <View style={styles.form}>
              <Text style={styles.err}>{this.state.msg}</Text>
              {/* <Text style={styles.err}>{this.props.token?this.props.token:'Nothing'}</Text> */}
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={this.onTextChange("email")}
                    value={this.state.review}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={this.onTextChange("password")}
                    value={this.state.review}
                    secureTextEntry={true}
                />
                <View style={styles.btn}>
                <Button
                    onPress={this.onPress}
                    title='Login'
                    color='coral'
                />
                </View>
          </View>
          <Button onPress={this.pressHendeler} title="SignUp"></Button>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "90%",
    // height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFECF9",
    // marginBottom: 2
  },
  input: {
    width: '70%',
    height: 38,
    padding: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: "#ddd",
    marginBottom: 5
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
  token:state.auth.token,
  isAuthenticated:state.auth.isAuthenticated,
  error:state.error
});

export default connect(mapStateToProps, { login, clearErrors } )(Login);
// export default Login;
