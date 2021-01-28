import React, { useRef } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Card className="w-100" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-left mb-4">Sign up</h2>
            <Form className="w-100">
              <Form.Group id="username">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button className="w-50 text-center mt-2" type="submit">
                Sign Up
              </Button>
            </Form>
            <div className="w-100 text-left mt-2 ml-2">
              Already have an account? Login here.
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;
