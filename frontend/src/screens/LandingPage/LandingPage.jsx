import React from "react";
import "./LandingPage.css";
import { Button, Container, Row } from "react-bootstrap";

export const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Adasha Mekomet Notes </h1>
              <p className="subtitle">
                One Safe place for all your work notes.
              </p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  start Now!
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};
