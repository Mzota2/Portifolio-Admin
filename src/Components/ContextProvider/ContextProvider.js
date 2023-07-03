import React from 'react';
import { userContext } from '../../Context';
import axios from 'axios';
import {getAccessToken, setAccessToken} from '../../Helpers'
import { useNavigate } from 'react-router-dom';
function ContextProvider({children}) {
    const [user, setUser]= React.useState();
    const [message, setMessage] = React.useState();
    const accessToken = getAccessToken();
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    const appUrl = process.env.REACT_APP_SERVER_URL;
    async function refreshToken(){
        try {
            if(getAccessToken()){
                await axios.get(appUrl+'/refresh', {
                withCredentials:true
                }).then(async(res)=>{
                    const access = await res.data;
                    setAccessToken(access);
                }).catch((error)=>{
                    setUser(undefined)
                    localStorage.removeItem('accessToken');
                    navigate('/signin');
                })
            
        }}catch (error) {
            console.log(error)
        }
           
    }
    if(getAccessToken()){
        setInterval(refreshToken, 240000);
    }
    

    const getLoggedInUser = async()=>{
        try {
            setIsLoading(true);
            await axios.get(appUrl+'/me',
         {
            withCredentials:true,
            headers:{
                Authorization:'bearer '+ accessToken,
            }
        } ).then(async(res)=>{
            const data = res.data;
            console.log(data);
            setUser(data);
        })
            
        } catch (error) {
            console.log(error)
            
        }
        finally{
            setIsLoading(false)
        }
        
    }

    async function getMessages(){
        try {
            setIsLoading(true)
            axios.get(appUrl+'/api/message', {
            headers:{
                Authorization:'bearer '+ accessToken
            }
            }).then(async(res)=>{
                const data = await res.data.messages;
                setMessage(data);
            }).catch((error)=>{
                console.log(error);
            })
            
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    React.useEffect(()=>{
        if(accessToken){
            getLoggedInUser();
            getMessages();
        }
    }, [accessToken])

    function handleUser(user){
        setUser(user);
    }

    function handleMessage(message){
        setMessage(message)
    }

  return (
    <userContext.Provider value={{user:user, setUser:handleUser, isLoading, message:message, setMessage:handleMessage}} >
        {children}
    </userContext.Provider>
  )
}

export default ContextProvider