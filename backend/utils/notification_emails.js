const transporterObj = require("./transporterObj");
exports.send_successful_donation_notification = async (
  donor_name,
  location,
  pickupTime
) => {
  const option = {
    from: donor_name,
    to: "jamescog72@gmail.com", // Admin's email address ,
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
    transporterObj.sendMail(option, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

exports.alertDistributor = async (
  distributor_email,
  donation_id,
  location,
  pickupTime,
  donor_contact_number
) => {
  const option = {
    from: "admin@nourishinghope.com",
    to: distributor_email,
    subject: "Distribution Assignment",
    html: `<!DOCTYPE html>
    <html>
    <head>
      <title>Donation Distribution</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f7f7f7;
          padding: 20px;
          margin: 0;
        }
        
        h2 {
          color: #333;
        }
        
        h3 {
          color: #555;
          margin-bottom: 10px;
        }
        
        p {
          color: #777;
          margin-top: 5px;
          margin-bottom: 10px;
        }
        
        strong {
          color: #333;
        }
        
        footer {
          margin-top: 20px;
          color: #777;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <h2>Donation Distribution</h2>
      
      <h3>Donation Details:</h3>
      <p><strong>Request ID:</strong> <${donation_id}></p>
      <p><strong>Location:</strong> <${location}></p>
      <p><strong>Pickup Time:</strong> <${pickupTime}></p>
      <p><strong>Donor Contact Number:</strong> <${donor_contact_number}></p>
      
      <h3>Instructions for Distribution:</h3>
      <p>Add any instructions or guidelines for the distributor here.</p>
      
      <h3>Contact Information:</h3>
      <p>If you have any questions or need assistance, please contact our support team at support@example.com or call +1 123-456-7890.</p>
      
      <footer>
        <p>Thank you for your dedication in distributing the donation and making a difference in the lives of those in need.</p>
        <p>Best regards,</p>
        <p>The [Website Name] Team</p>
      </footer>
    </body>
    </html>`,
  };

  return new Promise((resolve, reject) => {
    transporterObj.sendMail(option, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};
