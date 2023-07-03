import React from 'react'
import { Form, Row, Col, Container, Button, Spinner } from 'react-bootstrap'
import axios from 'axios';
import { getAccessToken } from '../../Helpers';
function CreateHomeTab() {
    const [home, setHome] = React.useState({
        hello:'',
        description:'',
        backgroundImage:[],
        
    });
    const appUrl = process.env.REACT_APP_SERVER_URL;
    const [isLoading, setIsLoading] = React.useState(false)
    const accessToken = getAccessToken();

    function onChangeHello(e){
        setHome(prev =>{
            return{
                ...prev,
                hello:e.target.value
            }
        })
    }

    function onChangeDescription(e){
        setHome(prev =>{
            return{
                ...prev,
                description:e.target.value
            }
        })
    }

    function onChangeImage(e){
       
        setHome(prev =>{
            return{
                ...prev,
                backgroundImage:e.target.files
            }
        })
      
    }

    async function handleSubmit(){
        try {
            setIsLoading(true)
            const formData = new FormData();
            const fileList = home.backgroundImage;
            for (let index = 0; index < fileList.length; index++) {
             const file = fileList[index];
             formData.append('testImage', file);
            }
            formData.append('hello', home.hello);
            formData.append('description', home.description)
     
            setHome(prev =>{
             return{
                 ...prev,   
             }
            });
             axios.post(appUrl+'/api/home', formData, {
                 headers:{
                     Authorization:'bearer '+accessToken,
                     Accept:"application/json",
                     "Content-Type":"multipart/form-data"
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
        {isLoading?<Spinner variant='info' animation='border'/>:<Form style={{marginTop:'10px'}} className='form'>
            <Row className='mb-5'>
                <Col>
                    <Form.Group>
                        <Form.Label>Hello</Form.Label>
                        <Form.Control onChange={onChangeHello} value={home.hello} name='hello' type='text' placeholder='Enter Hello Text...' />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={onChangeDescription} value={home.description} as='textarea' placeholder='Enter Description...' />
                    </Form.Group>
                </Col>

            </Row>


            <Row className='mb-5'>
                <Col>
                    <Form.Group>
                        <Form.Label>Home Images</Form.Label>
                        <Form.Control name='testImage' onChange={onChangeImage} type='file' placeholder='Upload Images' multiple='multiple' />
                    </Form.Group>

                </Col>

            </Row>

            <Button onClick={handleSubmit} className='about-submit' variant='warning'>Submit</Button>

        </Form>}

    </Container>
  )
}

export default CreateHomeTab