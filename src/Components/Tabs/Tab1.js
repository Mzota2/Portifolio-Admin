import React from 'react'
import { Nav , Container} from 'react-bootstrap';
import { useMediaQuery } from '@mui/material';
import './Tab1.css'
function Tab1({setActive}) {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    function handleClick(e){
        setActive(e.target.textContent);
    }

    const [activeKey, setActiveKey] = React.useState('1');

    function handleSelect(key){
        setActiveKey(key);
    }


  return (
    <Nav >
        {isNonMobileScreens?<Nav style={{width:'100%'}} justify bg='dark' variant="tabs" activeKey={activeKey} onSelect={handleSelect}>

        <Nav.Item>
            <Nav.Link eventKey='1' onClick={handleClick}>Home</Nav.Link>
        </Nav.Item>

        <Nav.Item>
            <Nav.Link onClick={handleClick} eventKey="2">About</Nav.Link>
        </Nav.Item>

        <Nav.Item>
            <Nav.Link onClick={handleClick} eventKey="3">Services</Nav.Link>
        </Nav.Item>

        <Nav.Item>
            <Nav.Link onClick={handleClick} eventKey="4">Projects</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link onClick={handleClick} eventKey="5">Contacts</Nav.Link>
        </Nav.Item>

        </Nav>:
      
        <Nav className='mobileTab' justify bg='dark' variant="tabs" activeKey={activeKey} onSelect={handleSelect}>
            <Nav.Item className='mob'>
                <Nav.Link eventKey='1' onClick={handleClick}>Home</Nav.Link>
            </Nav.Item>

            <Nav.Item  className='mob'>
                <Nav.Link onClick={handleClick} eventKey="2">About</Nav.Link>
            </Nav.Item>

            <Nav.Item  className='mob'>
                <Nav.Link onClick={handleClick} eventKey="3">Services</Nav.Link>
            </Nav.Item>

            <Nav.Item  className='mob'>
                <Nav.Link onClick={handleClick} eventKey="4">Projects</Nav.Link>
            </Nav.Item>
            <Nav.Item  className='mob'>
                <Nav.Link onClick={handleClick} eventKey="5">Contacts</Nav.Link>
            </Nav.Item>

</Nav>}
    </Nav>
    
  )
}

export default Tab1