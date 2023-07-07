import React from 'react'
import { Form, Row, Col, Container, Button, Spinner } from 'react-bootstrap'
import axios from 'axios';
import { getAccessToken } from '../../Helpers';
function EditHomeTab() {
    const accessToken = getAccessToken();
    const [home, setHome] = React.useState({
        hello:'',
        description:'',
        backgroundImage:[],
    });
    const appUrl = process.env.REACT_APP_SERVER_URL;
    const [isLoading, setIsLoading] = React.useState(false)

    const [homeBackgroundImages, setHomeBackgroundImages] = React.useState('');

    function onChangeHomeBackgroundImages(e){
        setHomeBackgroundImages(e.target.files);
    }

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
                backgroundImage:home.backgroundImage.push(e.target.value)
            }
        })
    }
   
    //getting individual about values
    React.useEffect(()=>{
        try {
            setIsLoading(true)
            let url_str = window.location.pathname;
            console.log(url_str);
            const sliced = url_str.slice(10);
            axios.get(appUrl+'/api/home/'+sliced,
            {
                withCredentials:true,
                headers:{
                    Authorization:'bearer '+accessToken
                }
            }).then(async(res)=>{
                const data = await res.data.home;
                console.log(data)
                setHome(data);
            }).catch((error)=>{
                console.log(error)
            })
            
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoading(false)
        }
        

    }, [accessToken]);

    //editing about
    async function handleSubmit(){
        try {
            setIsLoading(true)
            let url_str = window.location.pathname;
            const sliced = url_str.slice(10);
            setHome((prev)=>{
                return{
                    ...prev
                }
            });
            const formData = new FormData();
            const fileList = homeBackgroundImages;
            const existingList = home.backgroundImage;
            if(!fileList){
                for (let index = 0; index < existingList.length; index++) {
                    const file = existingList[index];
                    formData.append('testImage', file);
                }
            }
            else{
                for (let index = 0; index < fileList.length; index++) {
                    const file = fileList[index];
                    formData.append('testImage', file);
                }
            }
            
            formData.append('hello', home.hello);
            formData.append('description', home.description)


            await axios.put(appUrl+'/api/home/'+sliced, formData, {
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
                        <Form.Label>Hello</Form.Label>
                        <Form.Control onChange={onChangeHello} value={home.hello} type='text' placeholder='Enter Hello Text...' />
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
                        <Form.Control onChange={onChangeHomeBackgroundImages} multiple type='file' placeholder='Upload Images' />
                        <br/>
                        <div className='upload--container'>
                        {
                            home.backgroundImage?.map((image)=>{
                                return(
                                    <div key={image}>
                                        { image.length>30?<img className='upload--image' src={`${appUrl}/${image}`} alt='home'/>:<></>} 
                                    </div>
                                    
                                )
                            })
                        }
                        </div>
                    </Form.Group>

                </Col>

            </Row>

            <Button onClick={handleSubmit} className='about-submit' variant='warning'>Submit</Button>
            <br/>

        </Form>}

    </Container>
  )
}

export default EditHomeTab