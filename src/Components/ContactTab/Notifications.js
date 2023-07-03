import React from 'react'
import axios from 'axios'
import { getAccessToken } from '../../Helpers'
import { Accordion, Container, Spinner } from 'react-bootstrap';
import { useUserContext } from '../../Context';
function Notifications() {
    const [messages, setMessage] = React.useState([]);
    const [isLoading, setIsLoading] =React.useState(false);
    const accessToken = getAccessToken();
    const {message} = useUserContext();
    const appUrl = process.env.REACT_APP_SERVER_URL;
  return (
    <Container>
        <br/>
    {isLoading?<Spinner variant='info' animation='border'/>:<Accordion>
        {
            message.map((item)=>{
                return(
                    <Accordion.Item eventKey='0' key={item._id}>
                        <Accordion.Header>{item.username}</Accordion.Header>
                        <code className='ms-auto' style={{marginLeft:'10px'}}>{item.email}</code>
                        <Accordion.Body>
                            {item.message}
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })
        }
    </Accordion>}
    </Container>
  )
}

export default Notifications