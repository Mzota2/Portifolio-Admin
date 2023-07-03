import React from 'react'
import { FormCheck, Form, Button, Spinner } from 'react-bootstrap';
import './SignUp.css';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
function SignUp() {
  const [user,  setUser] = React.useState({
    username:'',
    email:'',
    password:''
  });
  const appUrl = process.env.REACT_APP_SERVER_URL;
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  function onChangeUsername(e){
    setUser(prev =>{
      return{
        ...prev,
        username:e.target.value
      }
    });
  }

    function onChangeEmail(e){
      setUser(prev =>{
        return{
          ...prev,
          email:e.target.value
        }
      });
    }

    function onChangePassword(e){
      setUser(prev =>{
        return{
          ...prev,
          password:e.target.value
        }
      })
    }

  async function handleSubmit(e){
    try {
      setIsLoading(true)
      setUser(prev =>{
        return{
          ...prev
        }
      });
  
      console.log(user);
  
      const createUser = await axios.post(appUrl+'/signup', user, {
        headers:{
          "Content-Type":"application/json"
        }}).then(async(res)=>{
          const data = await res.data;
          navigate('/signin')
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
    <div >
      {isLoading?<Spinner animation='border' variant='info'/>:<div className='form-container'>
      <div className='left'>
        
        </div>
  
        <div className='right'>
          <h2>Sign Up</h2>
        <Form style={{width:'80%'}} className='form' >
          <div>
          <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control value={user.username} onChange={onChangeUsername} type='text' placeholder='Enter username...'/>
            </Form.Group>
  
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control value={user.email} onChange={onChangeEmail} type='email' placeholder='Enter Email...'/>
            </Form.Group>
  
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control value={user.password} onChange={onChangePassword} type='password' placeholder='Enter Password...'/>
            </Form.Group>
          </div>
            
            <Button onClick={handleSubmit} variant='warning' className='sign-up-btn'>Sign Up</Button>
          </Form>
        </div>
      </div>}
    </div>
  )
}

export default SignUp