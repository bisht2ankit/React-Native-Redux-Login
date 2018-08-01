import React,{Component} from 'react';
import {View,TouchableOpacity,Text,TextInput}  from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../redux/actions/authActions'

class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:''
    }
  }

  login(){

    this.props.login(this.state.email,this.state.password).then(() => {
      if(this.props.error){
        alert(this.props.error)
      }
      else{
        alert(this.props.userData.user.name+' user successfully logged in ')
      }
    })
  }
  render(){
    return(
      <View style={{flex:1}}>
        <TextInput autoCapitalize="none" keyboardType="email-address" style={{marginTop:200,marginHorizontal:40,height:40}} placeholder="Enter email" value={this.state.email} onChangeText={email => this.setState({email})}/>
        <TextInput autoCapitalize="none" secureTextEntry style={{marginTop:20,marginHorizontal:40,height:40}} placeholder="Enter password" value={this.state.password} onChangeText={password => this.setState({password})}/>
        <TouchableOpacity onPress={() => this.login()}>
          <Text style={{marginTop:20,color:'black',textAlign:'center'}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn:state.auth.isLoggedIn,
  isLoading:state.auth.isLoading,
  userData:state.auth.userData,
  error:state.auth.error
})

const mapDispatchToProps = dispatch => ({
  login:(email,password) => dispatch(actions.login({email,password}))
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)
