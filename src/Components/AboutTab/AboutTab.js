import React from 'react'
import {Row, Col, Container , Button, Accordion} from 'react-bootstrap'
import './AboutTab.css';
import axios from 'axios';
import { getAccessToken, setAccessToken } from '../../Helpers';
import {NavLink, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
function AboutTab() {
    const navigate = useNavigate();
    const [about, setAbout]= React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const accessToken =  getAccessToken();

    const appUrl = process.env.REACT_APP_SERVER_URL;

    async function getAbout(){
        try {
            setIsLoading(true);
            await axios.get(appUrl+'/api/about', {
        }).then(async(res)=>{
            const data = await res.data.about;
            console.log(data);
            setAbout(data)
            
        })
            
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }

        
    }

   React.useEffect(()=>{
    getAbout();
   
   }, [accessToken]);

   async function deleteAbout(id){
    try {
        setIsLoading(true)
        await axios.delete(appUrl+'/api/about/'+id, {
        withCredentials:true,
        headers:{
            Authorization:'bearer '+accessToken
        }
    }).then(async(res)=>{
        const data = await res.data;
        const filterAbout = about.filter((item) => item._id !== id);
        setAbout(filterAbout);

    }).catch((error)=>{
        console.log(error);
    })
        
    } catch (error) {
        console.log(error)
    }finally{
        setIsLoading(false);
    }
    
   }
   
   
  return (
    <Container >
        {isLoading?<Spinner animation="border" variant="info" />:
            about.map((item)=>{
                return(
        <Accordion defaultActiveKey={'0'} key={item._id} >
            <Accordion.Item eventKey='0'>
                <Accordion.Header>About Title</Accordion.Header>
                <Accordion.Body>
                    {item.about_title}
                </Accordion.Body>

            </Accordion.Item>

            <Accordion.Item eventKey='1'>
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>
                    {item.about_description}
                </Accordion.Body>

            </Accordion.Item>

            <Accordion.Item eventKey='2'>
                <Accordion.Header>Skills</Accordion.Header>
                <Accordion.Body >
                    {item.about_skills}
                </Accordion.Body>

            </Accordion.Item>
            <Accordion.Item eventKey='3'>
                <Accordion.Header>About Image</Accordion.Header>
                <Accordion.Body >
                <div className='upload--container'>
                    {item?.about_image?
                            <div >
                                {item.about_image.length>30?<img className='upload--image' src ={require(`../../uploads/${item.about_image.slice(30)}`)} alt='logo'/>:<></>} 
                            </div>:<></>
                        //{String(item.backgroundImage).length>30?<img className='home--image' src ={require(`../../uploads/${image}`)} alt='logo'/>:<></>}
                    }
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        

            <Row className='btn-container'>
                <Col>
                    <Button variant='primary' onClick={()=>{navigate(`/editAbout/${item._id}`)}}  className='about-edit-btn'>Edit</Button>
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

export default AboutTab