import React from "react"

export const userContext = React.createContext({
    isLoading:false,
    message:undefined,
    setMessage:()=>{},
    user:undefined,
    setUser:()=>{}
});

export const useUserContext = ()=>React.useContext(userContext);

