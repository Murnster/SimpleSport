CREATE TABLE `events` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `startDate` varchar(255) NOT NULL, `endDate` varchar(255) NOT NULL, `desc` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`));
ALTER TABLE `events` ADD typeID int NOT NULL;
INSERT INTO `events` VALUES (1,'Tuesday Practice','2022-10-11T16:30:00','2022-10-14T18:30:00','Practice at 4:30pm behind the school');

CREATE TABLE `eventTypes` (`typeID` int NOT NULL AUTO_INCREMENT, `title` varchar(50) NOT NULL, PRIMARY KEY (`typeID`));
INSERT INTO `eventTypes` VALUES (null, 'Practice');
INSERT INTO `eventTypes` VALUES (null, 'Game');
INSERT INTO `eventTypes` VALUES (null, 'Team Event');

CREATE TABLE `eventMembers` (`eventID` int NOT NULL, `memberID` int NOT NULL, PRIMARY KEY (`eventID`));

CREATE TABLE `roster` (`memberID` int NOT NULL AUTO_INCREMENT, `firstName` varchar(50) NOT NULL, `lastName` varchar(50) NOT NULL, `memberTypeID` int NOT NULL, `phone` varchar(50) NOT NULL, `email` varchar(50) NOT NULL, `emContactName` varchar(50) NOT NULL, `emPhone` varchar(50) NOT NULL, `emEmail` varchar(50) NOT NULL, PRIMARY KEY (`memberID`));
INSERT INTO `roster` (`memberID`, `firstName`, `lastName`, `memberTypeID`, `phone`, `email`, `emContactName`, `emPhone`, `emEmail`) VALUES (null, 'Ryan', 'Murney', 1, '9024021227', 'rmurney@gmail.com', 'Gerry Murney', '9028600263', 'gerrymurney@hotmail.com');

CREATE TABLE `memberTypes` (`typeID` int NOT NULL AUTO_INCREMENT, `title` varchar(50) NOT NULL, PRIMARY KEY (`typeID`));
INSERT INTO `memberTypes` VALUES (null, 'Player');
INSERT INTO `memberTypes` VALUES (null, 'Coach');
INSERT INTO `memberTypes` VALUES (null, 'Trainer');

ALTER TABLE events MODIFY COLUMN startDate datetime NOT NULL;
ALTER TABLE events MODIFY COLUMN endDate datetime NOT NULL;

INSERT INTO `memberTypes` VALUES (null, 'Other');