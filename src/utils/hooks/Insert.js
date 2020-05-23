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
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
export default userInsert;
