import React from 'react'
import {Row, Col, Container , Button, Accordion, Spinner} from 'react-bootstrap'
import axios from 'axios';
import { getAccessToken} from '../../Helpers';
import {NavLink, useNavigate } from 'react-router-dom';

function HomeTab() {

    const [home, setHome]= React.useState([])
    const accessToken =  getAccessToken();
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    const appUrl = process.env.REACT_APP_SERVER_URL;
    async function getHome(){
        try {
            setIsLoading(true)
            await axios.get(appUrl+'/api/home', {
           
            }).then(async(res)=>{
                const data = await res.data.home;
                console.log(data);
                setHome(data)
                
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

   async function deleteHome(id){
        try {
            setIsLoading(true)
            await axios.delete(appUrl+'/api/home/'+id, {
            withCredentials:true,
            headers:{
                Authorization:'bearer '+accessToken
            }
            }).then(async(res)=>{
                const data = await res.data;
                const filterHome = home.filter((item) => item._id !== id);
                setHome(filterHome);

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
            home.map((item)=>{
                return(
        <Accordion defaultActiveKey={'0'} key={item._id} >
            <Accordion.Item eventKey='0'>
                <Accordion.Header>Hello</Accordion.Header>
                <Accordion.Body>
                    {item?.hello}
                </Accordion.Body>

                

            </Accordion.Item>

            <Accordion.Item eventKey='1'>
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>
                   {item?.description}
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='2'>

                <Accordion.Header>Background Images</Accordion.Header>
                <Accordion.Body >
                    <div className='upload--container'>
                    {item?.backgroundImage?.map((imagePath)=>{
                        const image = String(imagePath).slice(30)
                        return(
                            <div key={imagePath}>
                                { String(imagePath).length?<img className='upload--image' src ={`${appUrl}/${imagePath}`} alt='logo'/>:<></> }
                            </div>
                        //{String(item.backgroundImage).length>30?<img className='home--image' src ={require(`../../uploads/${image}`)} alt='logo'/>:<></>}
                        )
                    })}
                    </div>
                    
         
                </Accordion.Body>
                {/* KC\Portifolio\Frontend\admin\src\uploads\1687493244096-telephone-612061_640.jpg */}
            </Accordion.Item>
            <Row className='mb-5 btn-container'>
            
                <Col>
                    <Button onClick={()=>{navigate(`/editHome/${item._id}`)}} className='about-edit-btn'>Edit</Button>
                    <Button variant='danger' onClick={()=>{deleteHome(item._id)}} className='about-delete-btn'>Delete</Button>

                </Col>

            </Row>   
        </Accordion>
                )
            })
        }


       
       
    </Container>
  )
}

export default HomeTab