import React from 'react'
import { Form, Row, Col, Container, Button } from 'react-bootstrap'
import './AboutTab.css'
import axios from 'axios';
import { getAccessToken } from '../../Helpers';
import Spinner from 'react-bootstrap/Spinner'
function CreateAboutTab() {
    const accessToken = getAccessToken();
    const [about, setAbout] = React.useState({
        about_title:'',
        about_description:'',
        about_skills:'',
        about_image:''
    });
    const appUrl = process.env.REACT_APP_SERVER_URL;
    const [isLoading, setIsLoading] = React.useState(false);

    function onChangeTitle(e){
        setAbout(prev =>{
            return{
                ...prev,
                about_title:e.target.value
            }
        })
    }

    function onChangeDescription(e){
        setAbout(prev =>{
            return{
                ...prev,
                about_description:e.target.value
            }
        })
    }

    function onChangeSkills(e){
        setAbout(prev =>{
            return{
                ...prev,
                about_skills:e.target.value
            }
        })
    }

    function onChangeImage(e){
        setAbout(prev =>{
            return{
                ...prev,
                about_image:e.target.files[0]
            }
        })
    }

    async function handleSubmit(){
        try {
            setIsLoading(true)
            const formData = new FormData();

            formData.append('upload', about.about_image);
            formData.append('about_skills', about.about_skills);
            formData.append('about_description', about.about_description);
            formData.append('about_title', about.about_title);

            axios.post(appUrl+'/api/about', formData , {
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
        {isLoading? <Spinner animation="border" variant="info" />:<Form style={{marginTop:'10px'}} className='form' >
            <Row className='mb-5'>
                <Col>
                    <Form.Group>
                        <Form.Label>About Title</Form.Label>
                        <Form.Control onChange={onChangeTitle} value={about.about_title} type='text' placeholder='Enter About Title...' />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group>
                        <Form.Label>About Description</Form.Label>
                        <Form.Control onChange={onChangeDescription} value={about.about_description} as='textarea' placeholder='Enter About Description...' />
                    </Form.Group>
                </Col>

            </Row>


            <Row className='mb-5'>
                <Col>
                    <Form.Group>
                        <Form.Label>About Skills</Form.Label>
                        <Form.Control value={about.about_skills} onChange={onChangeSkills} as='textarea' placeholder='Enter About Top Skills' />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group>
                        <Form.Label>About Image</Form.Label>
                        <Form.Control name='aboutImage' onChange={onChangeImage} type='file' placeholder='Enter About Image' />
                    </Form.Group>

                </Col>

            </Row>

            <Button onClick={handleSubmit} className='about-submit' variant='warning'>Submit</Button>

        </Form>}


    </Container>
  )
}

export default CreateAboutTab