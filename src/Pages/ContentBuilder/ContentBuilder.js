import React from 'react'
import CreateAboutTab from '../../Components/AboutTab/CreateAboutTab'
import CreateHomeTab from '../../Components/HomeTab/CreateHomeTab'
import CreateProjectsTab from '../../Components/ProjectsTab/CreateProjectsTab'
import CreateServicesTab from '../../Components/ServicesTab/CreateServicesTab'
import CreateContactTab from '../../Components/ContactTab/CreateContactTab'
import Tab1 from '../../Components/Tabs/Tab1'
function ContentBuilder() {
  const [active, setActive] = React.useState('');
  function handleActiveTab (tab){
    setActive(tab);
  }

  return (
    <div>
      <br/>
      <Tab1  setActive ={handleActiveTab}/>
      <br/>
      {active=='Home'?<CreateHomeTab/>:active=='About'?<CreateAboutTab/>:active=='Services'?<CreateServicesTab/>:
      active=='Projects'?<CreateProjectsTab/>:active=='Contacts'? <CreateContactTab/>:<CreateHomeTab/>}
    </div>
  )
}

export default ContentBuilder