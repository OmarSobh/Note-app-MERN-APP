import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./RegisterScreen.css";
import { MainScreen } from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

function RegisterScreen({ history }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const navigate = useNavigate();

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    // ... Cloudinary upload code here (uncomment if required)
  };

  const isPasswordValid = (password) => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~]/;

    return (
      lowercaseRegex.test(password) &&
      uppercaseRegex.test(password) &&
      numberRegex.test(password) &&
      symbolRegex.test(password)
    );
  };

  const validateForm = () => {
    // Validate name, email, password, and confirmPassword here
    // Set appropriate error messages using setMessage

    if (!name.trim()) {
      setMessage("Name is required");
      return false;
    }

    if (name.length < 3 || name.length > 50) {
      setMessage("Name should be between 3 and 50 characters");
      return false;
    }

    if (!email.trim()) {
      setMessage("Email is required");
      return false;
    }

    if (!emailIsValid(email)) {
      setMessage("Invalid email format");
      return false;
    }

    if (!password.trim()) {
      setMessage("Password is required");
      return false;
    }

    if (password.length < 6) {
      setMessage("Password should be at least 6 characters");
      return false;
    }

    if (!isPasswordValid(password)) {
      setMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol"
      );
      return false;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return false;
    }

    return true;
  };

  const emailIsValid = (email) => {
    // Basic email format validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(register(name, email, password, pic));
      navigate("/mynotes");
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}

          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="file"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group>

          <Button  className="mt-3"variant="primary" type="submit">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen;
