$(document).ready(() => {
  // make an api call to the backend to get the account details
  $.ajax({
    url: "http://localhost:4550/api/admin/thisaccount",
    method: "GET",
    // use auth of Bearer token from local storage of token
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    success: (response) => {
      console.log(response);

      const admin = response.user.dataValues;
      // change the value of p with id account-name to the admin's name(admin.username)
      $("#account-name").text(admin.username);
    },
    error: (err) => {
      console.log(err);
    },
  });

  // send an ajax request to /api/admin/stat
  $.ajax({
    url: "http://localhost:4550/api/admin/stat",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .done((response) => {
      const stats = response.stats;
      console.log(stats);
      $("#donation-num").text(stats.requests);
      $("#don-num").text(stats.donors);
      $("#coll-num").text(stats.collectors);
      $("#distr-num").text(stats.distributors);
    })
    .fail((xhr, status, error) => {
      console.log(error);
    });
});
