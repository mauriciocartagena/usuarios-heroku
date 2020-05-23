import React, { Component } from "react";
import TableApi from "../components/TableApi";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Container fluid="lg">
        <h1 style={{ textAlign: "center" }}>Usuarios</h1>
        <TableApi></TableApi>
      </Container>
    );
  }
}

export default App;
