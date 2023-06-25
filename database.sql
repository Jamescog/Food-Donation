-- Create table Admins
CREATE TABLE Admins (
  admin_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  city VARCHAR(50),
  phone_number VARCHAR(50)
);

-- Create table Collectors
CREATE TABLE Collectors (
  collector_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  state VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  woreda VARCHAR(50) NOT NULL,
  kebele VARCHAR(50) NOT NULL
);

-- Create table Distributors
CREATE TABLE Distributors (
  distributor_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  state VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  woreda VARCHAR(50) NOT NULL,
  kebele VARCHAR(50) NOT NULL
);

-- Create table Donation_Requests
CREATE TABLE Donation_Requests (
  request_id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT NOT NULL,
  collector_id INT,
  distributor_id INT,
  contact_number VARCHAR(20) NOT NULL,
  location VARCHAR(200) NOT NULL,
  prepared_datetime DATETIME NOT NULL,
  pickup_time ENUM('Morning', 'Afternoon', 'Night') NOT NULL,
  state ENUM('New', 'Pending', 'Done') NOT NULL,
  FOREIGN KEY (donor_id) REFERENCES Donors(donor_id),
  FOREIGN KEY (collector_id) REFERENCES Collectors(collector_id),
  FOREIGN KEY (distributor_id) REFERENCES Distributors(distributor_id)
);

-- Create table Donors
CREATE TABLE Donors (
  donor_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  category ENUM('Individual', 'Business'),
  name VARCHAR(100),
  address VARCHAR(200),
  contact_number VARCHAR(20),
  status ENUM('Active', 'Blocked') NOT NULL DEFAULT 'Active'
);

