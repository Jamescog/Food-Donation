const payload = {
  username: "admin",
  email: "admin@nourshinghope.com",
  password: "12345678",
};

fetch("http://localhost:4550/api/admin/createadmin", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
