$(document).ready(() => {
  $("#sign_in").click((event) => {
    event.preventDefault(); // Prevent the default form submission

    const email = $("#email").val();
    const password = $("#password").val();

    const data = {
      email,
      password,
    };

    $.ajax({
      url: "http://localhost:4550/api/admin/login",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(data),
      contentType: "application/json",
      success: (response) => {
        localStorage.setItem("token", response.token);
        window.location.href = "/admin/admin.html";
      },
      error: (xhr, status, error) => {
        // remove class="hidden" from div with id"error-message"
        $("#error-message").removeClass("hidden");
        console.log(xhr.responseJSON);
      },
    });
  });
});
