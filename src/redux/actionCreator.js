import * as ActionTypes from './actionTypes';
import {baseUrl} from '../shared/baseUrl'

export const loginUser=(Creds) => (dispatch) => {

  dispatch(requestLogin(Creds));

  return fetch(baseUrl + 'users/login',{
    method:'POST',
    headers: { 
      'Content-Type':'application/json'
    },
    body: JSON.stringify(Creds)
  })
  .then((response)=>{
    if (response.ok)
    return response
    else{
      var error = new Error('Error '+ response.status +":"+ response.statusText)
      error.response= response
      throw error
    }
  },(err)=>{
    throw err
  })
  .then((res)=> res.json())
  .then((response)=> {
    if(response.success){
      // console.log("token recieved",response.user.token)
      console.log("loginUsefr",Creds)
    localStorage.setItem('token',response.user.token);
    localStorage.setItem('creds',JSON.stringify(Creds))
    localStorage.setItem('user',response.user._id)
    dispatch(fetchProducts ())
   
    dispatch(receivedtLogin({token:response.token,user_Id:response.user._id,creds:JSON.parse(JSON.stringify(Creds))}));

  }
  else{
    var error = new Error('Error '+ response.status +":"+ response.statusText)
    error.response= response
    throw error
  }
  })
  .catch((err)=> dispatch(loginError(err.message)))
}

export const requestLogin=(Creds)=>{
  return{
    type:ActionTypes.LOGIN_REQUEST,
    Creds
  }
}
export const receivedtLogin=(user_details)=>{
  return{
    type:ActionTypes.LOGIN_SUCCESS,
    user_details
  }
}



export const loginError=(errmess)=>{
  return{
    type:ActionTypes.LOGIN_FAILED,
    errmess
  }
}

export const requestLogout=()=>{
  return{
    type:ActionTypes.LOGOUT_REQUEST
    
  }
}
export const receivelogout=()=>{
  return{
    type:ActionTypes.LOGOUT_SUCCESS
    
  }
}
export const logoutFailed=(errmess)=>{
  return{
    type:ActionTypes.LOGOUT_FAILED,
    errmess
  }
}

export const requestSignupDetails=(info)=>{
  return{
    type:ActionTypes.REQUEST_SIGNUP_CREDENTIALS,
    info
  }
}
export const signupFailure=(errmess)=>{
  return{
    type:ActionTypes.SIGNUP_FAILED,
    errmess
  }
}
export const signupNewUser = (info) => (dispatch) => {
  dispatch(requestSignupDetails(info))

  return fetch(baseUrl + 'users/signup',{
    method : 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(info)
  })
  .then((response)=>{
    if(response.ok)
   { 
     console.log(response)
    return response
  }
    else{
      var error = new Error('Error '+ response.status +' :'+ response.statusText)
      error.response = response;
      throw error
    }
  },(error)=>{
    throw error
  })
  .then((response)=>response.json())
  .then((response)=>{console.log(response)
    
  })
  .catch((err)=>{
    dispatch(signupFailure(err.message))
  })
}

export const logoutUser=() => (dispatch) =>{
  dispatch(requestLogout())
  localStorage.removeItem('token');
  localStorage.removeItem('creds');
  localStorage.removeItem('user');
  dispatch( receivelogout())
  // dispatch( receivedtLogin(''))
}
export const fetchProducts =()=> (dispatch)=> {
  dispatch(loadProducts(true));

  let userId =  localStorage.getItem('params') 

  if( userId === 'undefined')
{
  console.log('expected undefined', localStorage.getItem('params') )
  return fetch(baseUrl + 'products')
  .then((res)=>{
    if(res.ok)
    return res
    else{
      var error = new Error('Error ' +res.status + ':'+ res.statusText)
      error.response= res
      throw error
    }
  },(err)=>{
    throw err
  })
   .then((res)=>res.json())
   .then((products)=>{dispatch(addProducts(products))})
   .catch((err)=> dispatch(productsFailed(err.message))) 


}
else{
  console.log('expected id', localStorage.getItem('params') )
  return fetch(baseUrl + `products/${localStorage.getItem('params')}`)
  .then((res)=>{
    if(res.ok)
    return res
    else{
      var error = new Error('Error ' +res.status + ':'+ res.statusText)
      error.response= res
      throw error
    }
  },(err)=>{
    throw err
  })
   .then((res)=>res.json())
   .then((products)=>{dispatch(addProducts(products))})
   .catch((err)=> dispatch(productsFailed(err.message))) 

}
}


 export const addProducts = (products) =>(
     { type:ActionTypes.ADD_PRODUCTS,
    payload:products}
 )

 export const loadProducts = () => (
   { type:ActionTypes.PRODUCTS_LOADING }
 )
 export const productsFailed = (errmess) => (
  { 
    type:ActionTypes.PRODUCTS_FAILED,
    errmess
  }
)
export const postProduct=(product) => (dispatch)=>{
    const bearer = 'Bearer ' +localStorage.getItem('token') 
      console.log(bearer)
    return fetch(baseUrl + 'products/upload/addproduct',{
      method: 'POST',
      body: product,
      headers:{
        'Authorization': bearer
      },
      credentials : 'same-origin'
    })
    .then((response)=>{
      if(response.ok)
      return response
      else{
        var error = new Error('Error ' +response.status + ':'+ response.statusText)
        error.response= response
        throw error
      }
    },err => {throw err})
    .then((res)=>res.json() )
    .then((res)=>{
        dispatch(fetchProducts())
    })
    .catch((res)=>{console.log(res.message);
    dispatch(productsFailed(res.message))})
}

 
export const deleteItem = (itemId) => dispatch =>{
  console.log(baseUrl + 'products/'+ itemId) 

  const bearer = 'Bearer ' +localStorage.getItem('token')

  return fetch(baseUrl + 'products/'+ itemId,{
    method:'DELETE',
    headers:{
      'Authorization': bearer
    },
    credentials : 'same-origin'
  })
  .then((response)=>{
    if(response.ok)
    return response
    else{
      var error = new Error('Error ' +response.status + ':'+ response.statusText)
      error.response= response
      throw error
    }
  },err => {throw err})
  .then((res) => res.json())
  .then((res)=>{
    console.log('Deleted'); 
    // dispatch(addProducts(res))
    dispatch(fetchProducts(localStorage.getItem('token')))
  })
  .catch((err)=>{
    console.log(err.message)
  })
}
export const getMatchParams=(params)=> dispatch =>{
  localStorage.setItem('params',params) ;
}


export const fetchProductsById=() => (dispatch) =>{

  
}