import React from 'react'
import { Form, Row, Col, Container, Button, Spinner } from 'react-bootstrap'
import axios from 'axios';
import { getAccessToken } from '../../Helpers';
function EditProjectsTab() {
    const [project, setProject] = React.useState({
        project_link:'',
        project_title:'',
        project_image:'',
      
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const appUrl = process.env.REACT_APP_SERVER_URL;
    const [projectImage , setProjectImage] = React.useState('');

    const accessToken = getAccessToken();

    function onChangeProjectImage(e){
        setProjectImage(e.target.files[0]);
    }
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

    //getting individual about values
    React.useEffect(()=>{
        try {
            setIsLoading(true)
            let url_str = window.location.pathname;
            console.log(url_str);
            const sliced = url_str.slice(13);
            axios.get(appUrl+'/api/project/'+sliced,
            {
                withCredentials:true,
                headers:{
                    Authorization:'bearer '+accessToken
                }
            
            }).then(async(res)=>{
                const data = await res.data.project;
                setProject(data);
            }).catch((error)=>{
                console.log(error)
            })
            
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
        

    }, [accessToken]);

    //editing about
    async function handleSubmit(){

        try {
            setIsLoading(true)
            let url_str = window.location.pathname;
        
            const sliced = url_str.slice(13);
            setProject((prev)=>{
                return{
                    ...prev
                }
            });

            const formData = new FormData();
            formData.append('upload', projectImage);
            formData.append('project_title', project.project_title);
            formData.append('project_link', project.project_link);


            await axios.put(appUrl+'/api/project/'+sliced, formData, {
                headers:{
                    Authorization:'bearer '+accessToken,
                    "Content-Encoding":"multipart/form-data"
                }
            }).then(async(res)=>{
                const data =  await res.data;
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
                    <Form.Control onChange={onChangeProjectImage} type='file' placeholder='Upload Image' />
                    <br/>
                    {
                        project.project_image?<img className='upload--image' src={require(`../../uploads/${project?.project_image?.slice(30)}`)} alt='project'/>:<></>}
                    
                    
                </Form.Group>
            </Col>


        </Row>

        <Button onClick={handleSubmit} className='about-submit' variant='warning'>Submit</Button>
        <br/>

    </Form>}
</Container>
  )
}

export default EditProjectsTab