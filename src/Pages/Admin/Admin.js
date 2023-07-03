import React from 'react'
import AboutTab from '../../Components/AboutTab/AboutTab'
import HomeTab from '../../Components/HomeTab/HomeTab'
import ProjectsTab from '../../Components/ProjectsTab/ProjectsTab'
import ServicesTab from '../../Components/ServicesTab/ServicesTab'
import ContactTab from '../../Components/ContactTab/ContactTab'
import Tab1 from '../../Components/Tabs/Tab1'
function Admin() {
  const [active, setActive] = React.useState('');

  function handleActiveTab (tab){
    setActive(tab);
  }
  return (
    <div>
      <br/>
      <Tab1 setActive ={handleActiveTab}/>
      <br/>
      {active=='Home'? <HomeTab/>:active=='About'?<AboutTab/>:
      active =='Services'?<ServicesTab/>:active=='Projects'?<ProjectsTab/>:
      active=='Contacts'?<ContactTab/>:<HomeTab/>}
    </div>
  )
}

export default Admin