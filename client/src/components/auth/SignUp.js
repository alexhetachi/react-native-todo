import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'
import { signup } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
class SignUp extends Component {

  state = {
    name:"",
    email:"",
    password:"",
    password2:"",
    msg:null
  }

    componentDidUpdate(prevProps){
    const {error} = this.props;
    if(error !== prevProps.error){
      if(error.id ==='REGESTER_FAIL'){
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
    const { name, email, password, password2 } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const newUser = {
      name,
      email,
      password,
      password2
    };
    if( !name || !email || !password || !password2 ){
      this.setState({ msg:'Please enter all fields.' })
    }else if(name.trim()==='' || password.trim()==='' || password2.trim()===''){
      this.setState({ msg:'Invalid fields.' })
    }
    else if( name.length < 3 || name.length >16 ){
      this.setState({ msg:'Name must contain 3-16 characters.' })
    }else if(reg.test(email) === false){
      this.setState({ msg:'Invaild email.' })
    }else if( password.length < 5 || password.length > 25 ){
      this.setState({ msg:'Password must contain 5-25 characters.' })
    }else if( password2 !== password ){
      this.setState({ msg:"Passwords doesn't match." })
    }else{
      this.setState({ msg:'' })
      console.log(newUser)
      // this.setState({
      //   name:"",
      //   review:""
      // })
      this.props.signup(newUser) 
      this.props.clearErrors()
    }

    // console.log(newUser)
    // // this.setState({
    // //   name:"",
    // //   review:""
    // // })
    // this.props.signup(newUser) 
    // this.props.clearErrors()
  }

  render(){
    return (
      <View style={styles.main}>
          <View style={styles.form}>
              <Text style={styles.err}>{this.state.msg}</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    onChangeText={this.onTextChange("name")}
                    value={this.state.name}
                />
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
                <TextInput
                    style={styles.input}
                    placeholder='Rewrite Password'
                    onChangeText={this.onTextChange("password2")}
                    value={this.state.review}
                    secureTextEntry={true}
                />
                <View style={styles.btn}>
                <Button
                    onPress={this.onPress}
                    title='Sign Up'
                    color='coral'
                />
                </View>
          </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "center",
    marginTop:"30%",
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

const mapStateToProps = state => ({
  token:state.auth.token,
  error:state.error
});

export default connect(mapStateToProps, { signup, clearErrors } )(SignUp);
// export default SignUp;
