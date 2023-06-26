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
  let currentPage = 1;

  const fetchDonorData = (page) => {
    $.ajax({
      url: `http://localhost:4550/api/admin/donationRequests?page=${page}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: (response) => {
        donors = response.donationRequests;
        currentPage = response.currentPage;
        populateDonorTable();
        updatePagination(response.totalDonationRequests);
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

      const row = `
          <tr>
              <th scope="row">${index + 1}</th>
              <td>${donor.request_id}</td>
              <td>${donor.prepared_datetime.substring(11, 16)}</td>
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

  const updatePagination = (totalDonationRequests) => {
    const totalPages = Math.ceil(totalDonationRequests / 9);
    const paginationElement = $(".pagination");
    paginationElement.empty();

    const previousLink =
      currentPage > 1
        ? `<a class="page-link" href="#">Previous</a>`
        : `<span class="page-link">Previous</span>`;
    paginationElement.append(`<li class="page-item">${previousLink}</li>`);

    for (let i = 1; i <= totalPages; i++) {
      const activeClass = currentPage === i ? "active" : "";
      paginationElement.append(
        `<li class="page-item"><a class="page-link ${activeClass}" href="#">${i}</a></li>`
      );
    }

    const nextLink =
      currentPage < totalPages
        ? `<a class="page-link" href="#">Next</a>`
        : `<span class="page-link">Next</span>`;
    paginationElement.append(`<li class="page-item">${nextLink}</li>`);
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

  $(document).on("click", ".pagination .page-link", handlePaginationClick);

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

  fetchDonorData(currentPage);
  fetchCollectors();
  fetchDistributors();
});
