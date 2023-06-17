const transporterObj = require("./transporterObj");
exports.send_successful_donation_notification = async (
  donor_name,
  location,
  pickupTime
) => {
  const option = {
    from: donor_name,
    to: "jamescog72@gmail.com", //admin ,
    subject: "Successful Donation Notification",
    html: `<html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 20px;
          }

          h1 {
            color: #333333;
            text-align: center;
          }

          p {
            color: #555555;
            font-size: 16px;
            margin-bottom: 10px;
          }

          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Successful Donation Notification</h1>
          <p>Dear Admin,</p>
          <p>A donation has been made by ${donor_name}.</p>
          <p>Donor Details:</p>
          <ul>
            <li><strong>Name:</strong> ${donor_name}</li>
            <li><strong>Location:</strong> ${location}</li>
            <li><strong>Pickup Time:</strong> ${pickupTime}</li>
          </ul>
          <p>Thank you for your attention!</p>
        </div>
      </body>
    </html>`,
  };

  return new Promise((resolve, reject) => {
    transporterObj.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};
