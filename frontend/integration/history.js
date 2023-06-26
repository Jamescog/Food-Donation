$(document).ready(() => {
  const endpoint = "http://localhost:4550/api/donor/mydonations";

  $.ajax({
    url: "http://localhost:4550/api/donor/thisaccount",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    success: (response) => {
      const donor = response.user;
      $("#account-name").text(donor.username);
    },
    error: (err) => {
      console.log(err);
    },
  });

  $.ajax({
    url: endpoint,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    success: (response) => {
      const donationRequests = response.donationRequests;

      for (let i = 1; i <= donationRequests.length; i++) {
        const donation = donationRequests[i - 1];
        const formIndex = i;
        const $form = $(`#form${formIndex}`);

        $form.find(`.fieldset${i}`).removeAttr("disabled");

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

        $form.find(`.fieldset${i}`).attr("disabled", "disabled");

        const $editBtn = $form.find(".edit-btn");
        const $discardEditBtn = $form.find(".discard-edit");

        if (donation.state === "Pending" || donation.state === "Done") {
          $editBtn.addClass("hidden");
          $discardEditBtn.addClass("hidden");
        } else {
          $editBtn.removeClass("hidden");
          $discardEditBtn.removeClass("hidden");
        }

        $form.find('[name="update"]').on("click", () => {
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

          $.ajax({
            url: `http://localhost:4550/api/donor/updatedonation/${donation.request_id}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(updatedData),
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            success: (response) => {
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

        $form.find(".del-donation").on("click", () => {
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

              $(document.body).append(modal);

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

      // Add hidden class to edit and cancel buttons for "Pending" or "Done" states
      $(".edit-btn, .del-donation").each(function () {
        const $this = $(this);
        const $form = $this.closest("form");
        const status = $form.find('[name="status"]').val();

        if (status === "Pending" || status === "Done") {
          $this.addClass("hidden");
        }
      });
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
});
