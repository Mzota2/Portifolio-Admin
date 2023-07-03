import React from 'react'
import { Form, Row, Col, Container, Button, Spinner } from 'react-bootstrap'
import axios from 'axios';
import { getAccessToken } from '../../Helpers';
function CreateServicesTab() {
    const [service, setService] = React.useState({
        service_title:'',
        service_icon:'',
        service_description:''
        
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const accessToken = getAccessToken();
    const appUrl = process.env.REACT_APP_SERVER_URL;
    function onChangeTitle(e){
        setService(prev =>{
            return{
                ...prev,
                service_title:e.target.value
            }
        })
    }

    function onChangeDescription(e){
        setService(prev =>{
            return{
                ...prev,
                service_description:e.target.value
            }
        })
    }

  

    async function handleSubmit(){
        try {
            setIsLoading(true)
            axios.post(appUrl+'/api/service', service , {
            headers:{
                Authorization:'bearer '+accessToken
            }
            
            }).then(async(res)=>{
                const data = await res.data;
                console.log(data);
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
        {isLoading?<Spinner animation='border' variant='info'/>:<Form style={{marginTop:'10px'}} className='form'>
            <Row className='mb-5'>
                <Col>
                    <Form.Group>
                        <Form.Label>Service Title</Form.Label>
                        <Form.Control onChange={onChangeTitle} value={service.service_title} type='text' placeholder='Enter Service Title...' />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group>
                        <Form.Label> Service Description</Form.Label>
                        <Form.Control onChange={onChangeDescription} value={service.service_description} as='textarea' placeholder='Enter Service Description...' />
                    </Form.Group>
                </Col>

            </Row>


            <Button onClick={handleSubmit} className='about-submit' variant='warning'>Submit</Button>

        </Form>}


    </Container>
  )
}

export default CreateServicesTab