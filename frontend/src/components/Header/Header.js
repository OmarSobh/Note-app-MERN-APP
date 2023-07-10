import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';

export const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Adasha Mekomet</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll" className='justify-content-end'>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/mynotes">Notes</Nav.Link>
            <NavDropdown title={`${userInfo?.name}Profile`} id="navbarScrollingDropdown" >
              <NavDropdown.Item href="/profile">{userInfo?.name} Profile</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                <Nav.Link onClick={logoutHandler}>
                  Logout
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
