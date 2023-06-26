$(document).ready(() => {
  const token = localStorage.getItem("token");

  // get admin's username
  $.ajax({
    url: "http://localhost:4550/api/admin/thisaccount",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    success: (response) => {
      const admin = response.user.dataValues;
      $("#account-name").text(`  ${admin.username.toUpperCase()}`);
    },
    error: (err) => {
      console.log(err);
    },
  });

  const fetchCollectors = () => {
    $.ajax({
      url: "http://localhost:4550/api/admin/getAllCollectors",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (response) => {
        console.log(response.collectors);
        const collectors = response.collectors;
        populateCollectorTable(collectors);
      },
      error: (error) => {
        console.error("Error fetching collector data:", error);
      },
    });
  };

  const populateCollectorTable = (collectors) => {
    const tbody = $("tbody");
    tbody.empty();

    collectors.forEach((collector, index) => {
      const address = collector.state + ", " + collector.city;
      const row = $("<tr>");
      row.append("<th scope='row'>" + (index + 1) + "</th>");
      row.append("<td>" + collector.collector_id + "</td>");
      row.append("<td>" + collector.username + "</td>");
      row.append("<td>" + collector.full_name + "</td>");
      row.append("<td>" + collector.email + "</td>");
      row.append("<td>" + address + "</td>");
      row.append("<td>" + collector.contact_number + "</td>");
      tbody.append(row);
    });
  };

  fetchCollectors();
});
