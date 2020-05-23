const userDelete = (id_usuario) => {
  var requestOptions = {
    method: "DELETE",
  };
  fetch(
    "https://heroku-usuarios-api.herokuapp.com/usuarios/delete/" +
      id_usuario +
      "",
    requestOptions
  ).then(() => {
    console.log("sucess");
  });
};

export default userDelete;
