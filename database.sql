-- Create the Donors table
CREATE TABLE Donors (
  donor_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  category ENUM('Individual', 'Business') NOT NULL,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(200) NOT NULL,
  contact_number VARCHAR(20)
);

-- Create the Collectors table
CREATE TABLE Collectors (
  collector_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  state VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  woreda VARCHAR(50) NOT NULL
);

-- Create the Distributors table
CREATE TABLE Distributors (
  distributor_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  state VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  woreda VARCHAR(50) NOT NULL
);

-- Create the Admins table
CREATE TABLE Admins (
  admin_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL
);

-- Create the Donation Requests table
CREATE TABLE Donation_Requests (
  request_id INT PRIMARY KEY AUTO_INCREMENT,
  donor_id INT NOT NULL,
  collector_id INT,
  distributor_id INT,
  location VARCHAR(200) NOT NULL,
  prepared_datetime DATETIME NOT NULL,
  pickup_time ENUM('Morning', 'Afternoon', 'Night') NOT NULL,
  state ENUM('New', 'Pending', 'Done') NOT NULL,
  FOREIGN KEY (donor_id) REFERENCES Donors(donor_id),
  FOREIGN KEY (collector_id) REFERENCES Collectors(collector_id),
  FOREIGN KEY (distributor_id) REFERENCES Distributors(distributor_id)
);
