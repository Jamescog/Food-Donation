$(document).ready(() => {
  $("#sign_up").click((event) => {
    event.preventDefault(); // Prevent the default form submission

    const username = $("#username").val();
    const email = $("#email").val();
    const password = $("#password").val();

    if (password.length < 8) {
      $("#password-error").text("Password should be at least 8 characters");
      $("#error-message").removeClass("hidden");
      return; // Exit the function if the password is too short
    }

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
        $("#success-message").removeClass("hidden");
        window.location.href = "http://localhost:4550/login.html";
      },
      error: (xhr, status, error) => {
        console.log(xhr.responseJSON);
      },
    });
  });
});
