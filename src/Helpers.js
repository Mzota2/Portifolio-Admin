export const setAccessToken = (accessToken)=>{
    localStorage.setItem('accessToken', JSON.stringify(accessToken));
}

export const getAccessToken = ()=>{
    return JSON.parse(localStorage.getItem('accessToken'))
}