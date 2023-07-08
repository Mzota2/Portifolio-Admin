import React from 'react'
import { Alert } from 'react-bootstrap'
function SuccessError({variant, heading,  message }) {
  const [show, setShow] = React.useState(true);

   React.useEffect(()=>{
    const timeout = setTimeout(setShow(false), 60000);
    
   }, [show])
  return (
    <Alert show={show} variant={variant} style={{position:'absolute'}}>
        <Alert.Heading>{heading}</Alert.Heading>
        <p>
           {message}
        </p>
  </Alert>
  )
}

export default SuccessError