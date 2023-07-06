import React, { useState } from 'react'
import { MainScreen } from '../../components/MainScreen'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';



const LoginScreen = () => {
      const [email,setEmail]=useState("");
      const [password,setPassword]=useState("");
      const [error,setError]=useState(false);
      const [loading,setLoading]=useState(false);

const submitHandler = (e) =>{
      e.preventDefault();
     console.log(email,password); 
}

      return (
            <MainScreen title='Login'>
                  <div className='loginContainer'>
                        <Form  onSubmit={submitHandler}>
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
                                    
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"  value={password} onChange={(e)=>setPassword(e.target.value)} />
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" />
                              </Form.Group>
                              <Button variant="primary" type="submit">
                                    Submit
                              </Button>
                              <Row className='py-3'>
                                    <Col>
                                    New Acount ? <a href="/register">Register Here</a>
                                    </Col>
                              </Row>
                        </Form>
                  </div>

            </MainScreen>
      )
}

export default LoginScreen