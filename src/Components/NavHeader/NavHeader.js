import React from 'react'
import { Nav, Navbar , Container, NavItem, NavbarBrand} from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
import { userContext, useUserContext } from '../../Context';
import { getAccessToken } from '../../Helpers';
import {useNavigate} from 'react-router-dom'
import {IoMdNotifications} from 'react-icons/io'
import logo from '../../logo.svg'
import './Nav.css';
import axios from 'axios';
function NavHeader() {
    const {user, setUser, message} = useUserContext();
    const navigate = useNavigate()
    const appUrl = process.env.REACT_APP_SERVER_URL;
    async function handleLogout(){
        axios.get(appUrl+'/logout', {
            withCredentials:true
        }).then((res)=>{
            setUser(undefined);
            localStorage.removeItem('accessToken');
            navigate('/signin');
        }).catch((error)=>{
            console.log(error);
        })
    }

    function showMessages(){
        navigate('/messages');
    }
  return (
    <Navbar bg='dark' data-bs-theme="dark" expand='md'>
        <Container>
            <NavbarToggle/>
            <NavbarBrand href='/'>
                <img src={logo} alt='logo' width='40' height='40'/>
            KC Admin Panel
            
            </NavbarBrand>
            {
                user?
                <NavbarCollapse>
                <Nav className='ms-auto nav-container'>
                    <NavItem >
                        <Nav.Link href='/content'>Content Builder</Nav.Link>
                    </NavItem>
                    <NavItem>
                        <Nav.Link href='/'>{user.username}</Nav.Link>
                    </NavItem>
                    <NavItem >
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </NavItem>

                    <NavItem className='notif-container'>
                        <span className='msg-counter'>{message?.length}</span>
                        <IoMdNotifications onClick={showMessages} className='notif-icon' ></IoMdNotifications>
                    </NavItem>

                </Nav>
                
            </NavbarCollapse>:
                <NavbarCollapse>
                <Nav className='ms-auto'>
                    <NavItem >
                        <Nav.Link href='/signin'>Sign In</Nav.Link>
                    </NavItem>
                    <NavItem>
                        <Nav.Link href='/signup'>Sign Up</Nav.Link>
                    </NavItem>

                </Nav>
                
            </NavbarCollapse>
            }
        </Container>
    </Navbar>
  )
}

export default NavHeader