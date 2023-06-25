$(document).ready(() => {
  const token = localStorage.getItem("token");
  let donors = [];
  let collectors = [];
  let distributors = [];

  const fetchDonorData = () => {
    $.ajax({
      url: "http://localhost:4550/api/admin/donationRequests",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (response) => {
        donors = response.donationRequests;
        populateDonorTable();
      },
      error: (error) => {
        console.error("Error fetching donor data:", error);
      },
    });
  };

  const fetchCollectors = () => {
    $.ajax({
      url: "http://localhost:4550/api/admin/getAllCollectors",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (response) => {
        collectors = response.collectors;
        populateDonorTable();
      },
      error: (error) => {
        console.log("Error fetching collectors:", error);
      },
    });
  };

  const fetchDistributors = () => {
    $.ajax({
      url: "http://localhost:4550/api/admin/getAllDistributors",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (response) => {
        distributors = response.distributors;
        populateDonorTable();
      },
      error: (error) => {
        console.log("Error fetching distributors:", error);
      },
    });
  };

  const populateDonorTable = () => {
    if (
      donors.length === 0 ||
      collectors.length === 0 ||
      distributors.length === 0
    ) {
      // Wait until all data is fetched
      return;
    }

    const tbody = $("#donor-table");
    tbody.empty();

    donors.forEach((donor, index) => {
      const collectorOptions =
        collectors.length > 0
          ? collectors
              .map(
                (collector) =>
                  `<option value="${collector.collector_id}">${collector.full_name}</option>`
              )
              .join("")
          : "";

      const distributorOptions =
        distributors.length > 0
          ? distributors
              .map(
                (distributor) =>
                  `<option value="${distributor.distributor_id}">${distributor.full_name}</option>`
              )
              .join("")
          : "";

      const collectorColumn = donor.collector_id
        ? `<td>${donor.collector_id}</td>`
        : `<td>
              <form action="#" method="#">
                <label for="collector-${index}" class="small">Collector</label>
                <select name="collector" id="collector-${index}" class="form-select border rounded border-warning w-75 py-0">
                  ${collectorOptions}
                </select>
              </form>
            </td>`;

      const distributorColumn = donor.distributor_id
        ? `<td>${donor.distributor_id}</td>`
        : `<td>
              <form action="#" method="#">
                <label for="distributor-${index}" class="small">Distributor</label>
                <select name="distributor" id="distributor-${index}" class="form-select border rounded border-warning w-75 py-0">
                  ${distributorOptions}
                </select>
              </form>
            </td>`;

      const statusColumn =
        donor.state === "Pending"
          ? `<td class="text-primary fw-semibold small">Pending</td>`
          : `<td>${donor.state}</td>`;

      const doneButton =
        donor.state === "Pending"
          ? `<button class="btn btn-primary">Mark it as Done</button>`
          : `<button class="btn btn-primary" disabled>Not Needed</button>`;

      const row = `
          <tr>
            <th scope="row">${index + 1}</th>
            <td>${donor.request_id}</td>
            <td>${donor.prepared_datetime}</td>
            <td>${donor.pickup_time}</td>
            <td>${donor.contact_number}</td>
            ${collectorColumn}
            ${distributorColumn}
            ${statusColumn}
            <td>${doneButton}</td>
          </tr>
        `;
      tbody.append(row);

      // Add event listener for collector select element
      $(`#collector-${index}`).on("change", function () {
        const collectorId = $(this).val();
        makeCollectorApiCall(donor.request_id, collectorId);
      });
      $(`#distributor-${index}`).on("change", function () {
        const distributorId = $(this).val();
        makeDistributorApiCall(donor.request_id, distributorId);
      });

      // Add event listener for done button
      $(`#done-${index}`).on("click", function () {
        makeDoneApiCall(donor.request_id);
      });
    });
  };

  const makeCollectorApiCall = (requestId, collectorId) => {
    // Make API call to assign collector
    $.ajax({
      url: `http://localhost:4550/api/admin/assignDistributor?request_id=${requestId}&distributor_id=${collectorId}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (response) => {
        // Handle success response
        console.log("Collector assigned successfully");
        // refresh the page
        location.reload();
      },
      error: (error) => {
        console.error("Error assigning collector:", error);
      },
    });
  };

  const makeDistributorApiCall = (requestId, distributorId) => {
    // Make API call to assign distributor
    $.ajax({
      url: `http://localhost:4550/api/admin/assignDistributor?request_id=${requestId}&distributor_id=${distributorId}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (response) => {
        // Handle success response
        alert("changed");
        console.log("Distributor assigned successfully");
        // refresh the page
        location.reload();
      },
      error: (error) => {
        console.error("Error assigning distributor:", error);
      },
    });
  };

  const makeDoneApiCall = (requestId) => {
    // Make API call to mark request as done
    $.ajax({
      url: `http://localhost:4550/api/admin/markRequestAsDone?request_id=${requestId}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (response) => {
        // Handle success response
        console.log("Request marked as done successfully");
        // refresh the page
        location.reload();
      },
      error: (error) => {
        console.error("Error marking request as done:", error);
      },
    });
  };

  const handlePaginationClick = (event) => {
    event.preventDefault();
    const pageNumber = $(event.target).text();
    fetchDonorData(pageNumber);
  };

  $(".pagination-link").on("click", handlePaginationClick);

  fetchDonorData();
  fetchCollectors();
  fetchDistributors();
});
