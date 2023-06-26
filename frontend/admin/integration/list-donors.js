$(document).ready(() => {
  const token = localStorage.getItem("token");

  const fetchDonors = () => {
    $.ajax({
      url: "http://localhost:4550/api/admin/getAllDonors",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (response) => {
        console.log(response.donors);
        const donors = response.donors;
        populateDonorTable(donors);
      },
      error: (error) => {
        console.error("Error fetching donor data:", error);
      },
    });
  };

  const populateDonorTable = (donors) => {
    const tbody = $("#donor-table tbody");
    tbody.empty();

    donors.forEach((donor, index) => {
      const row = $("<tr>");
      row.append("<th scope='row'>" + (index + 1) + "</th>");
      row.append("<td>" + donor.donor_id + "</td>");
      row.append("<td>" + donor.username + "</td>");
      row.append("<td>" + donor.email + "</td>");
      row.append("<td>" + donor.address + "</td>");
      row.append("<td>" + donor.contact_number + "</td>");

      tbody.append(row);
    });
  };

  fetchDonors();
});
