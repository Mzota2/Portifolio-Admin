import React from 'react'
import { Form, Row, Col, Container, Button, Spinner } from 'react-bootstrap'
import axios from 'axios';
import { getAccessToken } from '../../Helpers';
function CreateProjectsTab() {
    const [project, setProject] = React.useState({
        project_link:'',
        project_title:'',
        project_image:'',
      
    });
    const[isLoading, setIsLoading]= React.useState(false);
    const accessToken = getAccessToken();
    const appUrl = process.env.REACT_APP_SERVER_URL;
    function onChangeLink(e){
        setProject(prev =>{
            return{
                ...prev,
                project_link:e.target.value
            }
        })
    }
    function onChangeTitle(e){
        setProject(prev =>{
            return{
                ...prev,
                project_title:e.target.value
            }
        })
    }

    function onChangeImage(e){
        setProject(prev =>{
            return{
                ...prev,
                project_image:e.target.files[0]
            }
        })
    }

   
    async function handleSubmit(){
        try {
            setIsLoading(true)
            const formData =  new FormData();
            formData.append('upload', project.project_image);
            formData.append('project_link', project.project_link);
            formData.append('project_title', project.project_title);
            
            await axios.post(appUrl+'/api/project', formData , {
                headers:{
                    Authorization:'bearer '+accessToken,
                    "Content-Encoding":"multipart/form-data"
                }
                
            }).then(async(res)=>{
                const data = await res.data;
                console.log(data);
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
        {isLoading?<Spinner animation='border' variant='info'/>:<Form style={{marginTop:'10px'}} className='form'>
            <Row className='mb-5'>
                <Col>
                    <Form.Group>
                        <Form.Label>Project Title</Form.Label>
                        <Form.Control onChange={onChangeTitle} value={project.project_title} type='text' placeholder='Enter Project Title...' />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group>
                        <Form.Label>Project Link</Form.Label>
                        <Form.Control onChange={onChangeLink} value={project.project_link} type='text' placeholder='Enter Project Link...' />
                    </Form.Group>
                </Col>


            </Row>


            <Row className='mb-5'>
                <Col>
                    <Form.Group>
                        <Form.Label>Project Image</Form.Label>
                        <Form.Control name='upload' onChange={onChangeImage} type='file' placeholder='Upload Image' />
                    </Form.Group>
                </Col>


            </Row>

            <Button onClick={handleSubmit} className='about-submit' variant='warning'>Submit</Button>

        </Form>}
    </Container>
  )
}

export default CreateProjectsTab