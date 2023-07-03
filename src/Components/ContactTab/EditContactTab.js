import React from 'react'
import { Form, Row, Col, Container, Button, Spinner } from 'react-bootstrap'
import axios from 'axios';
import { getAccessToken } from '../../Helpers';
function EditContactTab() {
    const [contact, setContact] = React.useState({
        contact_title:'',
        contact_description:'',
        contact_link:'',
    });

    const [isLoading, setIsLoading] = React.useState(false);
    const appUrl = process.env.REACT_APP_SERVER_URL;
    const accessToken = getAccessToken();

    function onChangeTitle(e){
        setContact(prev =>{
            return{
                ...prev,
                contact_title:e.target.value
            }
        })
    }

    function onChangeDescription(e){
        setContact(prev =>{
            return{
                ...prev,
                contact_description:e.target.value
            }
        })
    }

    function onChangeLink(e){
        setContact(prev =>{
            return{
                ...prev,
                contact_link:e.target.value
            }
        })
    }

    //getting individual about values
    React.useEffect(()=>{
        try {
            setIsLoading(true)
            let url_str = window.location.pathname;
            const sliced = url_str.slice(13);
            // /editContact/
            axios.get(appUrl+'/api/contact/'+sliced,
            {
                withCredentials:true,
                headers:{
                    Authorization:'bearer '+accessToken
                }
            
            }).then(async(res)=>{
                const data = await res.data.contact;
                setContact(data);
            }).catch((error)=>{
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
       

    }, [accessToken]);

    //editing contact
    async function handleSubmit(){
        try {
            let url_str = window.location.pathname;
            const sliced = url_str.slice(13);
            setContact((prev)=>{
                return{
                    ...prev
                }
            });
            await axios.put(appUrl+'/api/contact/'+sliced, contact, {
                headers:{
                    Authorization:'bearer '+accessToken
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
        {isLoading?<Spinner variant='info' animation='border'/>:<Form style={{marginTop:'10px'}} className='form'>
            <Row className='mb-5'>
                <Col>
                    <Form.Group>
                        <Form.Label>Contact Title</Form.Label>
                        <Form.Control onChange={onChangeTitle} value={contact.contact_title} type='text' placeholder='Enter Contact Title...' />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group>
                        <Form.Label>Contact Description</Form.Label>
                        <Form.Control onChange={onChangeDescription} value={contact.contact_description} as='textarea' placeholder='Enter Contact Description...' />
                    </Form.Group>
                </Col>

            </Row>


            <Row className='mb-5'>
                <Col>
                    <Form.Group>
                        <Form.Label>Contact Link</Form.Label>
                        <Form.Control value={contact.contact_link} onChange={onChangeLink} type='text' placeholder='Enter Link...' />
                    </Form.Group>
                </Col>

            </Row>

            <Button onClick={handleSubmit} className='about-submit' variant='warning'>Submit</Button>

        </Form>}
    </Container>
  )
}

export default EditContactTab