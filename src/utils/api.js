// const mysql = require("mysql");

module.exports = (app, connection) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(("Content-Type", "application/json"));
    res.header("Accept", "application/json");
    res.header("Access-Control-Allow-Methods", " GET, POST, PUT, DELETE");
    next();
  });
  app.post(
    "/api/usuarios/:nombre/:ape_paterno/:ape_materno/:ci/:genero/:direccion",
    (req, res) => {
      let nombre = req.params.nombre;
      let apellido_paterno = req.params.ape_paterno;
      let apellido_materno = req.params.ape_materno;
      let ci = req.params.ci;
      let genero = req.params.genero;
      let direccion = req.params.direccion;
      connection.query(
        "INSERT INTO `usuarios` (`nombre`,`apellido_paterno`,`apellido_materno`,`ci`,`genero`,`direccion`)VALUES ('" +
          nombre +
          "','" +
          apellido_paterno +
          "','" +
          apellido_materno +
          "','" +
          ci +
          "','" +
          genero +
          "','" +
          direccion +
          "');",
        function (err, data) {
          err ? res.send(err) : res.json({ usuarios: data });
        }
      );
    }
  );
  app.get("/", function (req, res) {
    connection.query("Select * from usuarios", function (err, data) {
      err ? res.send(err) : res.json({ usuarios: data });
    });
  });
  app.get("/:id", function (req, res) {
    let id = req.params.id;
    connection.query(
      "Select * from usuarios WHERE id_usuario =" + id,
      function (err, data) {
        err ? res.send(err) : res.json({ usuarios: data });
      }
    );
  });
  app.delete("/usuario/:id", function (req, res) {
    let id = req.params.id;
    connection.query("DELETE FROM usuarios WHERE id_usuario=" + id, function (
      err,
      data
    ) {
      err ? res.send(err) : res.send("success");
    });
  });

  app.put(
    "/update/:id/:nombre/:ape_paterno/:ape_materno/:ci/:genero/:direccion",
    function (req, res) {
      let id = req.params.id;
      let nombre = req.params.nombre;
      let apellido_paterno = req.params.ape_paterno;
      let apellido_materno = req.params.ape_materno;
      let ci = req.params.ci;
      let genero = req.params.genero;
      let direccion = req.params.direccion;

      connection.query(
        "UPDATE usuarios SET nombre = '" +
          nombre +
          "', apellido_paterno = '" +
          apellido_paterno +
          "', apellido_materno= '" +
          apellido_materno +
          "', ci='" +
          ci +
          "', genero='" +
          genero +
          "', direccion='" +
          direccion +
          "' WHERE id_usuario='" +
          id +
          "'  LIMIT 1",
        function (err, data) {
          err ? res.send(err) : res.send("success");
        }
      );
    }
  );
};
