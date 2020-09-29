import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Header from "../components/Header";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error_message: ""
    };
  }

  componentDidMount() {
    if (localStorage.getItem("auth-token")) {
      this.props.history.push("/home");
    }
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/login",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email: this.state.email,
        password: this.state.password
      }
    };

    axios(requestOptions).then(res => {
      if (res.data.status === 200) {
        localStorage.setItem("user-details", JSON.stringify(res.data.users));
        localStorage.setItem("auth-token", res.data.token);
        this.props.history.push("/home");
      } else if (res.data.status == 400) {
        this.setState({
          error_message: res.data.msg
        });
      }
    });
  };

  toggle = () => {
    this.setState({
      userLogin: !this.state.userLogin
    });
  };
  render() {
    return (
      <div>
        <Header />
        <div className="p-4"></div>
        <Container className="border p-3 mt-5 mb-5">
          <Form className="mt-4 mb-4" onSubmit={this.submitHandler}>
            <Col>
              <h2>Login</h2>
            </Col>
            {this.state.error_message ? <Alert style={{ backgroundColor: "#720000" }}>{this.state.error_message}</Alert> : ""}
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input className="input-bg" type="email" size="5" name="email" id="exampleEmail" placeholder="myemail@email.com" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="********" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <Button color="dark" type="submit" className="bg-black">
                Login
              </Button>
            </Col>
            <Col className="mt-2">
              Don't have an account?
              <Button color="link">
                <Link to="/register">Register</Link>
              </Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
