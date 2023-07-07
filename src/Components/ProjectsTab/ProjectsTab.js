import React from 'react'
import {Row, Col, Container , Button, Accordion, Spinner} from 'react-bootstrap'
import axios from 'axios';
import { getAccessToken, setAccessToken } from '../../Helpers';
import {NavLink, useNavigate } from 'react-router-dom';
function ProjectsTab() {

    const [project, setProject]= React.useState([])
    const accessToken =  getAccessToken();
    const [isLoading, setIsLoading] = React.useState(false)
    const navigate = useNavigate();
    const appUrl = process.env.REACT_APP_SERVER_URL;
    async function getProject(){
        try {
            setIsLoading(true)
            await axios.get(appUrl+'/api/project', {
            }).then(async(res)=>{
                const data = await res.data.project;
                console.log(data);
                setProject(data)
                
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
    getProject();
   
   }, [accessToken]);

   async function deleteAbout(id){
        try {
            setIsLoading(true)
            await axios.delete(appUrl+'/api/project/'+id, {
            withCredentials:true,
            headers:{
                Authorization:'bearer '+accessToken
            }
            }).then(async(res)=>{
                const data = await res.data;
                const filterProject = project.filter((item) => item._id !== id);
                setProject(filterProject);

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
            project.map((item)=>{
                return(
        <Accordion defaultActiveKey={'0'} key={item._id} >
            <Accordion.Item eventKey='0'>
                <Accordion.Header>Project Title</Accordion.Header>
                <Accordion.Body>
                    {item.project_title}
                </Accordion.Body>

            </Accordion.Item>

            <Accordion.Item eventKey='1'>
                <Accordion.Header>Project Link</Accordion.Header>
                <Accordion.Body>
                    {item.project_link}
                </Accordion.Body>

            </Accordion.Item>

            <Accordion.Item eventKey='2'>
                <Accordion.Header>Project Image</Accordion.Header>
                <Accordion.Body>
                {item?.project_image?
                            <div >
                                {item.project_image.length>30?<img className='upload--image' src ={`${appUrl}/${item.project_image}`} alt='logo'/>:<></>}

                            </div>:<></> }
                </Accordion.Body>
            </Accordion.Item>

            <Row className='mb-5 btn-container'>
                 
                <Col>
                    <Button onClick={()=>{navigate(`/editProject/${item._id}`)}} className='about-edit-btn'>Edit</Button>
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

export default ProjectsTab;