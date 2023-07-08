import React from 'react'
import {Form, Button, Spinner } from 'react-bootstrap';
import './SignIn.css';
import axios from 'axios';
import {setAccessToken} from '../../Helpers';
import {useNavigate} from 'react-router-dom';
import {useUserContext} from '../../Context'
import {useMediaQuery} from '@mui/material'
import SuccessError from '../../Components/SuccessError/SuccessError';
function SignIn() {
  const [user,  setUserData] = React.useState({
    email:'',
    password:''
  });
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [isLoading, setIsLoading] = React.useState(false);
  const {setUser} = useUserContext();
  const appUrl = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
    function onChangeEmail(e){
      setUserData(prev =>{
        return{
          ...prev,
          email:e.target.value
        }
      });
    }

    function onChangePassword(e){
      setUserData(prev =>{
        return{
          ...prev,
          password:e.target.value
        }
      })
    }

    

  async function handleSubmit(e){

    try {
      setIsLoading(true)
      e.preventDefault();
      setUserData(prev =>{
        return{
          ...prev
        }
      });

      await axios.post(appUrl+'/signin', user, {
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }}).then(async(res)=>{
        const accessToken = await res.data;
        console.log(accessToken)
        setUser(user);
        setAccessToken(accessToken);
        //setInterval(refreshToken, 20000)
        navigate('/')
      }).catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
    
  }

  return (
    <div>
      {isLoading?<Spinner animation='border' variant='info'/>: isNonMobileScreens?<div className='form-container'>
        
        
        
      <div className='left'>
        
        </div>
  
        <div className='right'>
          <h2>Sign In</h2>
        <Form style={{width:'80%'}} className='form' >
          <div>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control value={user.email} onChange={onChangeEmail} type='email' placeholder='Enter Email...'/>
            </Form.Group>
  
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control value={user.password} onChange={onChangePassword} type='password' placeholder='Enter Password...'/>
            </Form.Group>
          </div>
            
            <Button onClick={handleSubmit} variant='warning' className='sign-in-btn'>Sign In</Button>
          </Form>
        </div>
      </div>: <div style={{width:'100%'}} className='right'>
          <h2>Sign In</h2>
        <Form style={{width:'80%'}} className='form' >
          <div>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control value={user.email} onChange={onChangeEmail} type='email' placeholder='Enter Email...'/>
            </Form.Group>
  
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control value={user.password} onChange={onChangePassword} type='password' placeholder='Enter Password...'/>
            </Form.Group>
          </div>
            
            <Button onClick={handleSubmit} variant='warning' className='sign-in-btn'>Sign In</Button>
          </Form>
        </div>}
       
    </div>
  )
}

export default SignIn