import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Header from "../components/Header";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      error_message: "",
      password_message: "Enter atleast 8 characters",
      password_alert: "primary",
      user_type: "Startup"
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

    if (this.state.password.length >= 8) {
      this.setState({
        password_message: "Strength: Strong",
        password_alert: "success"
      });
    } else if (this.state.password.length < 5) {
      this.setState({
        password_message: "Strength: Weak",
        password_alert: "danger"
      });
    } else {
      this.setState({
        password_message: "Strength: Medium",
        password_alert: "warning"
      });
    }
  };

  submitHandler = event => {
    event.preventDefault();
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/register",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.confirm_password,
        user_type: this.state.user_type
      }
    };

    axios(requestOptions).then(res => {
      console.log(res);
      if (res.data.status === 200) {
        alert("Registered Successfully!");
        this.props.history.push("/");
      } else if (res.data.status == 400) {
        this.setState({
          error_message: res.data.msg
        });
      }
    });
  };

  registerAsStakeholder = () => {
    this.setState({
      user_type: "Stakeholder"
    });
  };

  registerAsStartup = () => {
    this.setState({
      user_type: "Startup"
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
              <h2>Register for {this.state.user_type}</h2>
            </Col>
            {this.state.error_message ? <Alert color="danger">{this.state.error_message}</Alert> : ""}
            <Col>
              <FormGroup>
                <Label>Full Name</Label>
                <Input className="input-bg" type="text" size="5" name="name" placeholder="enter name" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
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
                <Alert className="mt-2" color={this.state.password_alert}>
                  {this.state.password_message}
                </Alert>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Confirm Password</Label>
                <Input type="password" name="confirm_password" placeholder="********" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <Button color="dark" type="submit" className="bg-black">
                Register
              </Button>
            </Col>
            <Col className="mt-2">
              {this.state.user_type === "Startup" ? (
                <div>
                  Want to register as Stakeholder ?
                  <Button style={{ boxShadow: "none" }} color="link" onClick={this.registerAsStakeholder}>
                    Click here
                  </Button>
                </div>
              ) : (
                <div>
                  Want to register as Startup ?
                  <Button style={{ boxShadow: "none" }} color="link" onClick={this.registerAsStartup}>
                    Click here
                  </Button>
                </div>
              )}
            </Col>
            <Col className="mt-2">
              Already have an account?
              <Button color="link">
                <Link to="/">Login</Link>
              </Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Register;
