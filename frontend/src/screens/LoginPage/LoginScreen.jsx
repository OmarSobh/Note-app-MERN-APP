import React, { useEffect, useState } from 'react'
import { MainScreen } from '../../components/MainScreen'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import axios from "axios";
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';


const LoginScreen = ({ history }) => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState(false);
      const [loading, setLoading] = useState(false);

      // useEffect(() => {
      //       const userInfo = localStorage.getItem("userInfo");
      //       if (userInfo) {
      //             history.push("/mynotes");
                  
      //       }
      // }, [history]
      // );

      const submitHandler = async (e) => {
            e.preventDefault();
            console.log(email, password);
            try {
                  const config = {
                        headers: {
                              "Content-type": "application/json"
                        }
                  }
                  setLoading(true);
                  const { data } = await axios.post("/api/users/login",
                        {
                              email,
                              password,
                        },
                        config
                  );
                  console.log(data)
                  localStorage.setItem('userInfo', JSON.stringify(data));
                  setLoading(false);
            } catch (error) {
                  setError(error.response.data.message);
                  setLoading(false);
            }
      };

      return (
            <MainScreen title='Login'>
                  <div className='loginContainer'>
                        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                        {loading && <Loading />}
                        <Form onSubmit={submitHandler}>
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />

                              </Form.Group>

                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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