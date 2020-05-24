import React, { Component } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";

class TableApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuarios: [],
      stado: null,
      id_usuario: 0,
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      ci: "",
      genero: "Femenino",
      direccion: "",
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers() {
    fetch("https://heroku-usuarios-api.herokuapp.com/usuarios")
      .then((response) => {
        return response.json();
      })
      .then((empleados) => {
        this.setState({ usuarios: empleados });
      });
  }

  render() {
    const userUpdate = (
      id_user,
      name,
      lastName,
      secondName,
      ci,
      gender,
      city
    ) => {
      var requestOptions = {
        method: "PUT",
        redirect: "follow",
      };
      fetch(
        "https://heroku-usuarios-api.herokuapp.com/usuarios/update/" +
          id_user +
          "/" +
          name +
          "/" +
          lastName +
          "/" +
          secondName +
          "/" +
          ci +
          "/" +
          gender +
          "/" +
          city +
          "/",
        requestOptions
      )
        .then(() => this.loadUsers())
        .then(() =>
          this.setState({
            stado: false,
            id_usuario: 0,
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            ci: "",
            genero: "Femenino",
            direccion: "",
          })
        )
        .catch((error) => console.log("error", error));
    };
    const userDelete = (id_usuario) => {
      var requestOptions = {
        method: "DELETE",
      };
      fetch(
        "https://heroku-usuarios-api.herokuapp.com/usuarios/delete/" +
          id_usuario +
          "",
        requestOptions
      )
        .then(() => {
          this.loadUsers();
        })
        .catch((error) => console.log("error", error));
    };
    const userInsert = (name, lastName, secondName, ci, gender, city) => {
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };
      fetch(
        "https://heroku-usuarios-api.herokuapp.com/usuarios/" +
          name +
          "/" +
          lastName +
          "/" +
          secondName +
          "/" +
          ci +
          "/" +
          gender +
          "/" +
          city,
        requestOptions
      )
        .then(() => this.loadUsers())
        .then(() =>
          this.setState({
            stado: false,
            id_usuario: 0,
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            ci: "",
            genero: "Femenino",
            direccion: "",
          })
        )
        .catch((error) => console.log("error", error));
    };
    return this.state.usuarios === 0 ? (
      <h1>Loading....</h1>
    ) : (
      <Container fluid="md">
        <Button
          variant="primary"
          onClick={() => this.setState({ stado: true })}
        >
          Agregar
        </Button>

        <Table striped bordered responsive hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>C.I</th>
              <th>Genero</th>
              <th>Direccion</th>
              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {this.state.usuarios.length > 0 &&
              this.state.usuarios.map((usuario, id) => (
                <React.Fragment key={id}>
                  <tr>
                    <th>{usuario.id_usuario}</th>
                    <th>{usuario.nombre}</th>
                    <th>{usuario.apellido_paterno}</th>
                    <th>{usuario.apellido_materno}</th>
                    <th>{usuario.ci}</th>
                    <th>{usuario.genero}</th>
                    <th>{usuario.direccion}</th>
                    <th>
                      <Button
                        variant="success"
                        onClick={() =>
                          this.setState({
                            stado: true,
                            id_usuario: usuario.id_usuario,
                            nombre: usuario.nombre,
                            apellido_paterno: usuario.apellido_paterno,
                            apellido_materno: usuario.apellido_materno,
                            ci: usuario.ci,
                            genero: usuario.genero,
                            direccion: usuario.direccion,
                          })
                        }
                      >
                        Modificar
                      </Button>
                    </th>
                    <th>
                      <Button
                        variant="danger"
                        onClick={() => userDelete(usuario.id_usuario)}
                      >
                        Eliminar
                      </Button>
                    </th>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
          {this.state.stado === true ? (
            <Modal show={this.state.stado}>
              <Modal.Header
                closeButton
                onClick={() =>
                  this.setState({
                    stado: false,
                    id_usuario: 0,
                    nombre: "",
                    apellido_paterno: "",
                    apellido_materno: "",
                    ci: "",
                    genero: "Femenino",
                    direccion: "",
                  })
                }
              >
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.nombre}
                      placeholder="Nombre"
                      onChange={(e) =>
                        this.setState({ nombre: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Apellido Paterno</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Apellido Paterno"
                      value={this.state.apellido_paterno}
                      onChange={(e) =>
                        this.setState({ apellido_paterno: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Apellido Paterno"
                      value={this.state.apellido_materno}
                      onChange={(e) =>
                        this.setState({ apellido_materno: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>C.I</Form.Label>
                    <Form.Control
                      type="num"
                      placeholder="C.I"
                      value={this.state.ci}
                      onChange={(e) => this.setState({ ci: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Genero</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.genero}
                      onChange={(e) =>
                        this.setState({ genero: e.target.value })
                      }
                    >
                      <option>Femenino</option>
                      <option>Masculino</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Direaccion"
                      value={this.state.direccion}
                      onChange={(e) =>
                        this.setState({ direccion: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        this.setState({
                          stado: false,
                          id_usuario: 0,
                          nombre: "",
                          apellido_paterno: "",
                          apellido_materno: "",
                          ci: "",
                          genero: "Femenino",
                          direccion: "",
                        });
                      }}
                    >
                      Close
                    </Button>
                    {this.state.id_usuario === 0 ? (
                      <Button
                        variant="primary"
                        onClick={() =>
                          userInsert(
                            this.state.nombre,
                            this.state.apellido_paterno,
                            this.state.apellido_materno,
                            this.state.ci,
                            this.state.genero,
                            this.state.direccion,
                            this.setState({ stado: false })
                          )
                        }
                      >
                        {this.state.id_usuario === 0
                          ? "Registrar"
                          : "Modificar"}
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() =>
                          userUpdate(
                            this.state.id_usuario,
                            this.state.nombre,
                            this.state.apellido_paterno,
                            this.state.apellido_materno,
                            this.state.ci,
                            this.state.genero,
                            this.state.direccion,
                            this.setState({ stado: false })
                          )
                        }
                      >
                        {this.state.id_usuario === 0 ? "Agregar" : "Modificar"}
                      </Button>
                    )}
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
          ) : (
            () => console.log("cerrado")
          )}
        </Table>
      </Container>
    );
  }
}

export default TableApi;
