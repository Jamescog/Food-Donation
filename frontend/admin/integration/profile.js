$(document).ready(() => {
  // Function to handle the update button click event
  const handleUpdate = () => {
    // Create an object with the updated values
    const updatedData = {
      username: $("#username").val() || "",
      email: $("#email").val() || "",
      address: `${$("#country").val() || ""}, ${$("#city").val() || ""}`,
      contact_number: $("#phone").val() || "",
    };

    // Send AJAX PUT request to update the donor's account
    $.ajax({
      url: "http://localhost:4550/api/admin/updateAdmin",
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      contentType: "application/json",
      data: JSON.stringify(updatedData),
      success: (response) => {
        // Handle the success response
        console.log("Account updated successfully:", response);
      },
      error: (error) => {
        // Handle the error response
        console.error("Error updating account:", error);
      },
    });
  };

  // AJAX request to get donor's account details
  $.ajax({
    url: "http://localhost:4550/api/donor/thisaccount",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    success: (response) => {
      const donor = response.user;
      $("#account-name").text(donor.username);

      // Fill input values
      $("#username").val(donor.username ? donor.username : "N/A");
      $("#email").val(donor.email ? donor.email : "N/A");

      // Separate address value into country and city
      const addressArray = donor.address
        ? donor.address.split(",")
        : ["N/A", "N/A"];
      const [country, city] = addressArray.map((item) => item.trim());
      $("#country").val(country);
      $("#city").val(city);

      $("#phone").val(donor.contact_number ? donor.contact_number : "N/A");

      // Fill side info card
      $("#sub-username").text(donor.username ? donor.username : "N/A");
      $("#sub-email").text(donor.email ? donor.email : "N/A");
      $(".bi-flag-fill").text(country);
      $(".bi-building").text(city);
      $(".bi-telephone-fill").text(
        donor.contact_number ? donor.contact_number : "N/A"
      );
    },
  });

  const successMessageHTML = `
      <div id="success-message" class="hidden">
          <p id="logout-success" class="alert alert-success text-center mt-5">You're logged out successfully</p>
      </div>
      `;
  $("#logout").click((e) => {
    e.preventDefault();
    localStorage.setItem("token", "");
    $("#success-message").html(successMessageHTML);
    $("#logout-success").removeClass("hidden"); // Add the success message HTML dynamically
    window.location.href = "login.html";
  });

  // Bind the update button click event to the handleUpdate function
  $(".btn-donate").on("click", handleUpdate);
});
