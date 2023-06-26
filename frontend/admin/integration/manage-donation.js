$(document).ready(() => {
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

      const doneButton =
        donor.state === "Pending"
          ? `<button class="btn btn-primary" id="done-${index}">Mark it as Done</button>`
          : `<button class="btn btn-primary" disabled>Not Needed</button>`;
      const [date, time] = donor.prepared_datetime.split("T");
      const formattedTime = time.split(":").slice(0, 2).join(":");
      const row = `
          <tr>
              <th scope="row">${index + 1}</th>
              <td>${donor.request_id}</td>
              <td>${formattedTime}</td>
              <td>${donor.pickup_time}</td>
              <td>${donor.contact_number}</td>
              ${collectorColumn}
              ${distributorColumn}
              <td>${donor.state}</td>
              <td>${doneButton}</td>
          </tr>
      `;

      tbody.append(row);

      $(`#collector-${index}`).on("change", function () {
        const collectorId = $(this).val();
        makeCollectorApiCall(donor.request_id, collectorId);
      });

      $(`#distributor-${index}`).on("change", function () {
        const distributorId = $(this).val();
        makeDistributorApiCall(donor.request_id, distributorId);
      });

      $(`#done-${index}`).on("click", function () {
        makeDoneApiCall(donor.request_id);
      });
    });
  };

  const makeCollectorApiCall = (requestId, collectorId) => {
    $.ajax({
      url: `http://localhost:4550/api/admin/assignCollector?request_id=${requestId}&collector_id=${collectorId}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (response) => {
        console.log("Collector assigned successfully");
        location.reload();
      },
      error: (error) => {
        console.error("Error assigning collector:", error);
      },
    });
  };

  const makeDistributorApiCall = (requestId, distributorId) => {
    $.ajax({
      url: `http://localhost:4550/api/admin/assignDistributor?request_id=${requestId}&distributor_id=${distributorId}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (response) => {
        console.log("Distributor assigned successfully");
        location.reload();
      },
      error: (error) => {
        console.error("Error assigning distributor:", error);
      },
    });
  };

  const makeDoneApiCall = (requestId) => {
    $.ajax({
      url: `http://localhost:4550/api/admin/markRequestAsDone?request_id=${requestId}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (response) => {
        console.log("Request marked as done successfully");
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
