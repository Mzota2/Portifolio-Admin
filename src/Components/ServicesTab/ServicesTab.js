import React from 'react'
import {Row, Col, Container , Button, Accordion, Spinner} from 'react-bootstrap'
import axios from 'axios';
import { getAccessToken} from '../../Helpers';
import {NavLink, useNavigate } from 'react-router-dom';
function ServicesTab() {

    const [service, setService]= React.useState([])
    const accessToken =  getAccessToken();
    const [isLoading, setIsLoading] = React.useState(false);
    const appUrl = process.env.REACT_APP_SERVER_URL;
    const navigate = useNavigate();
    async function getHome(){
        try {
            setIsLoading(true)
            await axios.get(appUrl+'/api/service', {
            }).then(async(res)=>{
                const data = await res.data.service;
                console.log(data);
                setService(data)
                
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
    getHome();
   
   }, [accessToken]);

   async function deleteAbout(id){
        try {
            setIsLoading(true)
            await axios.delete(appUrl+'/api/service/'+id, {
                withCredentials:true,
                headers:{
                    Authorization:'bearer '+accessToken
                }
            }).then(async(res)=>{
                const data = await res.data;
                const filterService = service.filter((item) => item._id !== id);
                setService(filterService);
        
            }).catch((error)=>{
                console.log(error);
            })
            
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
   
   }
   
   
  return (
    <Container >
        {isLoading?<Spinner animation='border' variant='info'/>:
            service.map((item)=>{
                return(
        <Accordion defaultActiveKey={'0'} key={item._id} >
            <Accordion.Item eventKey='0'>
                <Accordion.Header>Title</Accordion.Header>
                <Accordion.Body>
                    {item.service_title}
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='1'>
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>
                    {item.service_description}
                </Accordion.Body>
            </Accordion.Item>
            <Row className='mb-5 btn-container'>
                <Col>
                    <Button onClick={()=>{navigate(`/editService/${item._id}`)}} className='about-edit-btn'>Edit</Button>
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

export default ServicesTab