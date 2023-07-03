import React from 'react'
import { Nav } from 'react-bootstrap'
function Tab1({setActive}) {
    function handleClick(e){
        setActive(e.target.textContent);
    }

    const [activeKey, setActiveKey] = React.useState('1');

    function handleSelect(key){
        setActiveKey(key);
    }

  return (
    <Nav justify bg='dark' variant="tabs" activeKey={activeKey} onSelect={handleSelect}>
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
      
  </Nav>
  )
}

export default Tab1