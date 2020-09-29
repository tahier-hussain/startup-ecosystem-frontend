import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert, Modal, ModalHeader, ModalBody } from "reactstrap";
import Header from "./Header";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      userData: []
    };
  }

  componentDidMount = () => {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/user",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token")
      }
    };

    axios(requestOptions).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.setState({
          userData: res.data
        });
      }
    });
  };
  render() {
    return (
      <div>
        <Header />
        <div className="p-3"></div>
        <Container className="mt-5">
          <h1>
            <strong>Welcome {this.state.userDetails.name}</strong>
          </h1>
        </Container>
      </div>
    );
  }
}

export default Home;
