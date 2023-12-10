-- Use the correct database
CREATE DATABASE tp_db;
USE tp_db;

-- Create the 'users' table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
);

-- Insert data into 'users' table
INSERT INTO users (name) VALUES
('Jamie Tartt'),
('Roy Kent'),
('Sam Obisanya'),
('Dani Rojas'),
('Moe Bumbercatch');

-- Create the 'matches' table
CREATE TABLE matches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    competitor1 VARCHAR(50),
    competitor2 VARCHAR(50),
    startDate DATETIME,
    endDate DATETIME,
    homeScore INT,
    awayScore INT,
    status ENUM('PREMAT','LIVE','ENDED')
);

-- Insert data into 'matches' table
INSERT INTO matches (title, competitor1, competitor2, startDate, endDate, homeScore, awayScore, status) VALUES
('Semi-final', 'Liverpool', 'Manchester', '2012-12-31T11:30:45', '2012-12-31T12:30:45', 2, 1, 'ENDED'),
('Semi-final', 'PSG', 'FC Creuse', '2013-12-26T11:30:45', '2013-12-26T12:30:45', 1, 4, 'ENDED'),
('Quarter-final', 'FC Dijon', 'FC Strasbourg', '2014-12-26T13:30:45', '2014-12-26T14:30:45', 1, 0, 'ENDED'),
('Quarter-final', 'FC Pessoux', 'FC Rennes', '2014-11-26T13:30:45', '2014-11-26T14:30:45', 0, 2, 'ENDED'),
('Quarter-final', 'FC Toulouse', 'FC Lyon', '2014-12-29T13:30:45', '2014-12-29T14:30:45', 1, 1, 'ENDED'),
('Quarter-final', 'FC Reims', 'FC Nice', '2017-12-26T13:30:45', '2017-12-26T14:30:45', 0, 1, 'ENDED');

-- Create the 'favorites' table
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (userID) REFERENCES users(id),
    FOREIGN KEY (matchID) REFERENCES matches(id)
);

-- Insert data into 'users' table
INSERT INTO favorites (userID, matchID) VALUES
(1, 1),
(1, 2),
(2, 5),
(3, 3),
(3, 1),
(3, 4),
(4, 2);

-- Create the 'users' table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (matchID) REFERENCES matches(id),
    eventDate DATETIME,
    whoScored VARCHAR(50)
);

-- Insert data into 'users' table
INSERT INTO events (matchID, eventDate, whoScored) VALUES
(1, '2012-12-31T11:55:45', "Liverpool"),
(1, '2012-12-31T12:10:45', "Liverpool"),
(1, '2012-12-31T12:25:45', "Manchester"),
(2, '2013-12-26T11:30:45', "PSG"),
(2, '2013-12-26T11:40:45', "FC Creuse"),
(2, '2013-12-26T11:50:45', "FC Creuse"),
(2, '2013-12-26T12:00:45', "FC Creuse"),
(2, '2013-12-26T12:10:45', "FC Creuse"),
(3, '2014-12-26T13:40:45', "FC Dijon"),
(4, '2014-11-26T13:40:45', "FC Rennes"),
(4, '2014-11-26T13:50:45', "FC Rennes"),
(5, '2014-12-29T13:40:45', "FC Toulouse"),
(5, '2014-12-29T13:50:45', "FC Lyon"),
(6, '2017-12-26T13:40:45', "FC Nice");