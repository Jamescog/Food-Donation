$(document).ready(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  $.ajax({
    url: "http://localhost:4550/api/donor/thisaccount",
    type: "GET",
    beforeSend: (xhr) => {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: (response) => {
      $("#account-name").text(response.user.username);
      $(".account-name").text(response.user.username);
    },
    error: (xhr, status, error) => {
      if (xhr.status === 401 || xhr.status === 403) {
        window.location.href = "login.html";
      } else {
        console.log(error);
      }
    },
  });

  $("#logout").click(() => {
    alert("You have been logged out.");
    localStorage.setItem("token", "");
    window.location.href = "login.html";
  });

  $(".btn-donate").click((event) => {
    event.preventDefault();

    const location = $("#location").val();
    const prepared_datetime = $("#preparedTime").val();
    const pickup_time = $("#time").find(":selected").text();
    const contact_number = $("#phone").val();

    const donationData = {
      location,
      pickup_time,
      prepared_datetime,
      contact_number,
    };

    $.ajax({
      url: "http://localhost:4550/api/donor/makedonation",
      type: "POST",
      data: JSON.stringify(donationData),
      contentType: "application/json",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (response) => {
        window.location.href = "history.html";
      },
      error: (xhr, status, error) => {
        console.log(error);
      },
    });
  });
});
