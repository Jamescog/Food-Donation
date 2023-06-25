$(document).ready(() => {
  const endpoint = "http://localhost:4550/api/donor/mydonations";

  // make an ajax request to the backend to get the account details
  $.ajax({
    url: "http://localhost:4550/api/donor/thisaccount",
    method: "GET",
    // use auth of Bearer token from local storage of token
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    success: (response) => {
      console.log(response);
      const donor = response.user;
      // change the value of p with id account-name to the donor's name(donor.username)
      $("#account-name").text(donor.username);
    },
    error: (err) => {
      console.log(err);
    },
  });

  // Fetch data from the backend
  $.ajax({
    url: endpoint,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    success: (response) => {
      const donationRequests = response.donationRequests;

      // Iterate over each form and populate the fields
      for (let i = 1; i <= donationRequests.length; i++) {
        const donation = donationRequests[i - 1];
        const formIndex = i;
        const $form = $(`#form${formIndex}`);

        // Enable the form fields by removing the 'disabled' attribute
        $form.find(`.fieldset${i}`).removeAttr("disabled");

        // Fill the form fields with data
        const timeOptions = {
          Morning: 1,
          Afternoon: 2,
          Night: 3,
        };
        $form
          .find('[name="date"]')
          .val(donation.prepared_datetime.substring(0, 10));
        $form.find('[name="phone"]').val(donation.contact_number);
        $form.find('[name="time"]').val(timeOptions[donation.pickup_time]);
        $form.find('[name="location"]').val(donation.location);
        $form.find('[name="status"]').val(donation.state);

        // Disable the form fields by adding back the 'disabled' attribute to the fieldset
        $form.find(`.fieldset${i}`).attr("disabled", "disabled");

        // Find the edit (with class edit-btn) and cancel (with class discard-edit) buttons
        const $editBtn = $form.find(".edit-btn");
        const $discardEditBtn = $form.find(".discard-edit");

        // If the [name="status"] is not "New", disable the edit button
        if (donation.state !== "New") {
          $editBtn.attr("disabled", true);
        }
        // Else remove the disabled attribute from the edit button
        else {
          $editBtn.removeAttr("disabled");
        }

        // Handle update button click on each form
        $form.find('[name="update"]').on("click", () => {
          // Get the updated form data
          const timeOptions = {
            1: "Morning",
            2: "Afternoon",
            3: "Night",
          };
          const option = $form.find('[name="time"]').val();

          const updatedData = {
            date: $form.find('[name="date"]').val(),
            contact_number: $form.find('[name="phone"]').val(),
            pickup_time: timeOptions[option],
            location: $form.find('[name="location"]').val(),
            status: $form.find('[name="status"]').val(),
          };

          // Send a PUT request to the backend
          $.ajax({
            url: `http://localhost:4550/api/donor/updatedonation/${donation.request_id}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(updatedData),
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            success: (response) => {
              // Handle the success response
              console.log("Update successful:", response);
            },
            error: (xhr, status, error) => {
              if (xhr.status === 401 || xhr.status === 403) {
                window.location.href = "login.html";
              } else {
                console.log(error);
              }
            },
          });
        });

        // handle the cancel button click on each form(with class del-donation)
        $form.find(".del-donation").on("click", () => {
          // send a DELETE request to the backend
          $.ajax({
            url: `http://localhost:4550/api/donor/canceldonation/${donation.request_id}`,
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            success: (response) => {
              const modal = `
      <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="successModalLabel">Donation Cancelled</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Your donation has been successfully cancelled.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

              // Append modal to the document
              $(document.body).append(modal);

              // Show the modal
              $("#successModal").modal("show");
            },
            error: (xhr, status, error) => {
              if (xhr.status === 401 || xhr.status === 403) {
                window.location.href = "login.html";
              } else {
                console.log(error);
              }
            },
          });
        });
      }
    },
    error: (xhr, status, error) => {
      console.error("Error:", error);
      if (xhr.status === 401 || xhr.status === 403) {
        window.location.href = "login.html";
      } else {
        console.log(error);
      }
    },
  });
});
