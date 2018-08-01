export function isLoading(bool:Boolean){
  return{
    type:'LOGIN_ATTEMPT',
    isLoading:bool
  }
}

export function loginSuccess(userData:Object){
  return{
    type:'LOGIN_SUCCESS',
    userData
  }
}

export function loginFailed(error:Object){
  return{
    type:'LOGIN_FAILED',
    error
  }
}

export function login(data:Object){
  return dispatch => {
    dispatch(isLoading(true));
    return fetch('http://192.168.0.101:3000/v1/auth/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        "email":data.email,
        "password":data.password
      })
    })
    .then((response) => {
      if(response.status < 300){
        dispatch(isLoading(false))
        response.json().then((responseJSON) => {
          console.log("responseJSON",responseJSON);
          dispatch(loginSuccess(responseJSON))
        })
      }
      else{
        response.json().then((responseJSON) => {
          console.log("responseJSON",responseJSON);
          dispatch(isLoading(false))
          dispatch(loginFailed(responseJSON.message))
        })
      }
    })
    .catch((error) => {
      console.log("error",error);
      dispatch(isLoading(false))
      dispatch(loginFailed(error))
    })
  }
}
