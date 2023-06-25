$(document).ready(() => {
  $("#sign_up").click((event) => {
    event.preventDefault(); // Prevent the default form submission

    const username = $("#username").val();
    const email = $("#email").val();
    const password = $("#password").val();

    const data = {
      username,
      email,
      password,
    };

    $.ajax({
      url: "http://localhost:4550/api/donor/register",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: (response) => {
        console.log(response);
        window.location.href = "http://localhost:4550/login.html";
      },
      error: (xhr, status, error) => {
        console.log(xhr.responseJSON);
      },
    });
  });
});
