import React from 'react'
import {Row, Col, Container , Button, Accordion, Spinner} from 'react-bootstrap'
import axios from 'axios';
import { getAccessToken, setAccessToken } from '../../Helpers';
import {NavLink, useNavigate } from 'react-router-dom';
function ContactTab() {

    const [contact, seContact]= React.useState([])
    const accessToken =  getAccessToken();
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    const appUrl = process.env.REACT_APP_SERVER_URL;
    async function getContact(){
        try {
            setIsLoading(true)
            await axios.get(appUrl+'/api/contact', {
            withCredentials:true,
            headers:{
                Authorization:'bearer '+accessToken
            }
        }).then(async(res)=>{
            const data = await res.data.contact;
            console.log(data);
            seContact(data)
            
        }).catch((error)=>{
            console.log(error)
        })
            
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
        
    }

   React.useEffect(()=>{
    getContact();
   
   }, [accessToken]);

   async function deleteAbout(id){
        try {
            setIsLoading(true)
            await axios.delete(appUrl+'/api/contact/'+id, {
            }).then(async(res)=>{
                const data = await res.data;
                const filterContact = contact.filter((item) => item._id !== id);
                seContact(filterContact);

            }).catch((error)=>{
                console.log(error);
            })
            
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoading(false)
        }
    
   }
   
   
  return (
    <Container >
        {isLoading?<Spinner variant='info' animation='border'/>:
            contact.map((item)=>{
                return(
        <Accordion defaultActiveKey={'0'} key={item._id} >
            <Accordion.Item eventKey='0'>
                <Accordion.Header>Title</Accordion.Header>
                <Accordion.Body>
                    {item.contact_title}
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='1'>
                 <Accordion.Header>Description</Accordion.Header>
                 <Accordion.Body>
                    {item.contact_description}
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='2'>
                <Accordion.Header>Link</Accordion.Header>
                <Accordion.Body >
                    {item.contact_link}
                </Accordion.Body>
            </Accordion.Item>

            <Row className='mb-5 btn-container'>
                 
                <Col>
                    <Button onClick={()=>{navigate(`/editContact/${item._id}`)}} className='about-edit-btn'>Edit</Button>
                    <Button variant='danger' onClick={()=>{deleteAbout(item._id)}} className='about-delete-btn'>Delete</Button>

                </Col>

            </Row>   
        </Accordion>
                )
            })
        }
    </Container>
  )
}

export default ContactTab