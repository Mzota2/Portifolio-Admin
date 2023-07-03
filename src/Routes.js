import React from 'react'
import {Routes as Routez, Route, HashRouter} from 'react-router-dom';
import { getAccessToken } from './Helpers';
import { Navigate } from 'react-router-dom';
import Admin from './Pages/Admin/Admin';
import SignUp from './Pages/SignUp/SignUp';
import SignIn from './Pages/SignIn/SignIn';
import ContentBuilder from './Pages/ContentBuilder/ContentBuilder';
import EditAboutTab from './Components/AboutTab/EditAboutTab';
import EditHomeTab from './Components/HomeTab/EditHomeTab';
import EditProjectsTab from './Components/ProjectsTab/EditProjectsTab';
import EditServicesTab from './Components/ServicesTab/EditServicesTab';
import EditContactTab from './Components/ContactTab/EditContactTab';
import Notifications from './Components/ContactTab/Notifications';
import { useUserContext } from './Context';
function Routes() {
  const {user} = useUserContext();
  return (
  
    <Routez>
        <Route exact path='/' element={getAccessToken() ?<Admin/>:<Navigate to={'/signin'}/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/messages' element={getAccessToken() ?<Notifications/>:<Navigate to={'/signin'}/>}/>
        <Route path='/editAbout/:id' element={getAccessToken() ?<EditAboutTab/>:<Navigate to={'/signin'}/>}/>
        <Route path='/editHome/:id' element={getAccessToken() ?<EditHomeTab/>:<Navigate to={'/signin'}/>}/>
        <Route path='/editProject/:id' element={getAccessToken() ?<EditProjectsTab/>:<Navigate to={'/signin'}/>}/>
        <Route path='/editService/:id' element={getAccessToken() ? <EditServicesTab/>:<Navigate to={'/signin'}/>}/>
        <Route path='/editContact/:id' element={getAccessToken() ?<EditContactTab/>:<Navigate to={'/signin'}/>}/>
        <Route path='/content' element={getAccessToken()?<ContentBuilder/>: <Navigate to={'/signin'}/>}/>
    </Routez>
 
  )
}

export default Routes