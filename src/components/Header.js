import React, { Component } from "react";
import { Collapse, Nav, NavbarBrand, Navbar, NavbarToggler, NavLink, Container } from "reactstrap";

class Header extends Component {
  state = {
    isOpen: false,
    userDetails: ""
  };

  componentDidMount() {
    if (localStorage.getItem("user-details")) {
      this.setState({
        userDetails: JSON.parse(localStorage.getItem("user-details"))
      });
    }
  }

  toggle = val => {
    if (val == "drop") {
      this.setState({
        isOpen: !this.state.isOpen
      });
    } else {
      this.setState({
        modal: !this.state.modal
      });
    }
  };

  logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-details");
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" className="nav-bar-fixed-top fixed-top">
          <Container>
            <NavbarBrand href="/home">
              <strong>StartUp Ecosystem</strong>
            </NavbarBrand>
            {localStorage.getItem("auth-token") ? <NavbarToggler onClick={() => this.toggle("drop")}></NavbarToggler> : ""}
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {localStorage.getItem("auth-token") ? <NavLink>My Profile</NavLink> : ""}
                {this.state.userDetails.user_type === "Startup" && localStorage.getItem("auth-token") ? <NavLink>Stakeholders</NavLink> : ""}
                {this.state.userDetails.user_type === "Stakeholder" && localStorage.getItem("auth-token") ? <NavLink>Startups</NavLink> : ""}
                {localStorage.getItem("auth-token") ? (
                  <NavLink href="/" onClick={this.logout}>
                    Logout
                  </NavLink>
                ) : (
                  ""
                )}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
