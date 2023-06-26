$(document).ready(() => {
  // Create Collector
  $("#createCollector").click((event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const username = $("#username").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const full_name = $("#fullName").val();
    const state = $("#state").val();
    const contact_number = $("#phone").val();
    const woreda = $("#wereda").val();
    const kebele = $("#kebele").val();
    const city = $("#city").val();

    const collectorData = {
      username,
      email,
      password,
      full_name,
      state,
      contact_number,
      city,
      woreda,
      kebele,
    };

    console.log(collectorData);

    $.ajax({
      url: "http://localhost:4550/api/admin/createCollector",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      contentType: "application/json",
      data: JSON.stringify(collectorData),
      success: (response) => {
        console.log("Collector created successfully:", response);
        window.location.href = "/admin/admin.html";
      },
      error: (error) => {
        console.error("Error creating collector:", error);
      },
    });
  });

  // Create Distributor
  $("#createDistributor").click((event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const username = $("#username").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const full_name = $("#fullName").val();
    const state = $("#state").val();
    const contact_number = $("#phone").val();
    const woreda = $("#wereda").val();
    const kebele = $("#kebele").val();
    const city = $("#city").val();

    const distributorData = {
      username,
      email,
      password,
      full_name,
      state,
      contact_number,
      city,
      woreda,
      kebele,
    };

    console.log(distributorData);

    $.ajax({
      url: "http://localhost:4550/api/admin/createDistributor",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      contentType: "application/json",
      data: JSON.stringify(distributorData),
      success: (response) => {
        console.log("Distributor created successfully:", response);
        window.location.href = "/admin/admin.html";
      },
      error: (error) => {
        console.error("Error creating distributor:", error);
      },
    });
  });
});
