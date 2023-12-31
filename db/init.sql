-- Use the correct database
CREATE DATABASE tp_db;
USE tp_db;

-- Create the 'users' table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
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
    status ENUM('PREMATCH','LIVE','ENDED')
);

-- Insert data into 'matches' table
INSERT INTO matches (title, competitor1, competitor2, startDate, endDate, homeScore, awayScore, status) VALUES
('Semi-final', 'Liverpool', 'Manchester', '2012-12-31T11:30:45', '2012-12-31T12:30:45', 2, 1, 'ENDED'),
('Semi-final', 'PSG', 'FC Creuse', '2013-12-26T11:30:45', '2013-12-26T12:30:45', 1, 4, 'ENDED'),
('Quarter-final', 'FC Dijon', 'FC Strasbourg', '2014-12-26T13:30:45', '2014-12-26T14:30:45', 1, 0, 'ENDED'),
('Quarter-final', 'FC Pessoux', 'FC Rennes', '2014-11-26T13:30:45', '2014-11-26T14:30:45', 0, 2, 'ENDED'),
('Quarter-final', 'FC Toulouse', 'FC Lyon', '2014-12-29T13:30:45', '2014-12-29T14:30:45', 1, 1, 'ENDED'),
('Quarter-final', 'FC Reims', 'FC Nice', '2017-12-26T13:30:45', '2017-12-26T14:30:45', 0, 1, 'ENDED'),
('Eighth-final', 'FC Marseille', 'FC Nantes', NOW(), NOW() + INTERVAL 1 HOUR, 0, 0, 'PREMATCH'),
('Eighth-final', 'FC Montpellier', 'FC Bordeaux', NOW(), NOW() + INTERVAL 1 HOUR, 0, 0, 'PREMATCH'),
('Eighth-final', 'FC Lille', 'FC Toulon', NOW(), NOW() + INTERVAL 1 HOUR, 0, 0, 'PREMATCH'),
('Eighth-final', 'FC Angers', 'FC Brest', NOW(), NOW() + INTERVAL 1 HOUR, 0, 0, 'PREMATCH');

-- Create the 'favorites' table
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    matchID INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(id),
    FOREIGN KEY (matchID) REFERENCES matches(id)
);

-- Insert data into 'users' table
INSERT INTO favorites (userID, matchID) VALUES
(1, 1),
(1, 2),
(1, 7),
(1, 6),
(2, 5),
(2, 8),
(3, 3),
(3, 1),
(3, 4),
(3, 7),
(4, 2),
(4, 9);

-- Create the 'users' table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matchID INT NOT NULL,
    FOREIGN KEY (matchID) REFERENCES matches(id),
    eventDate DATETIME,
    homeScore INT,
    awayScore INT,
    status ENUM('PREMATCH','LIVE','ENDED')
);

-- Insert data into 'users' table
INSERT INTO events (matchID, eventDate, homeScore, awayScore, status) VALUES
(1, '2012-12-31T11:30:45', 0, 0, "LIVE"),
(1, '2012-12-31T11:55:45', 1, 0, "LIVE"),
(1, '2012-12-31T12:10:45', 2, 0, "LIVE"),
(1, '2012-12-31T12:25:45', 2, 1, "LIVE"),
(1, '2012-12-31T12:30:45', 2, 1, "ENDED"),
(2, '2013-12-26T11:30:45', 0, 0, "LIVE"),
(2, '2013-12-26T11:31:45', 1, 0, "LIVE"),
(2, '2013-12-26T11:40:45', 1, 1, "LIVE"),
(2, '2013-12-26T11:50:45', 1, 2, "LIVE"),
(2, '2013-12-26T12:00:45', 1, 3, "LIVE"),
(2, '2013-12-26T12:10:45', 1, 4, "LIVE"),
(2, '2013-12-26T12:30:45', 1, 4, "ENDED"),
(3, '2014-12-26T13:30:45', 0, 0, "LIVE"),
(3, '2014-12-26T13:40:45', 1, 0, "LIVE"),
(3, '2014-12-26T14:30:45', 1, 0, "ENDED"),
(4, '2014-11-26T13:30:45', 0, 0, "LIVE"),
(4, '2014-11-26T13:40:45', 0, 1, "LIVE"),
(4, '2014-11-26T13:50:45', 0, 2, "LIVE"),
(4, '2014-11-26T14:30:45', 0, 2, "ENDED"),
(5, '2014-12-29T13:30:45', 0, 0, "LIVE"),
(5, '2014-12-29T13:40:45', 0, 1, "LIVE"),
(5, '2014-12-29T13:50:45', 1, 1, "LIVE"),
(5, '2014-12-29T14:30:45', 1, 1, "ENDED"),
(6, '2017-12-26T13:30:45', 0, 0, "LIVE"),
(6, '2017-12-26T13:40:45', 0, 1, "LIVE"),
(6, '2017-12-26T14:30:45', 0, 1, "ENDED");