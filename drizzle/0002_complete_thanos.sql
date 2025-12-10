CREATE TABLE `orderItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`category` varchar(50) NOT NULL,
	`itemName` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orderItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`packageId` varchar(100) NOT NULL,
	`packageName` varchar(255) NOT NULL,
	`packageType` varchar(50) NOT NULL,
	`pricePerPerson` int NOT NULL,
	`guestCount` int NOT NULL,
	`totalAmountPence` int NOT NULL,
	`stripePaymentIntentId` varchar(255),
	`paymentStatus` enum('pending','succeeded','failed','cancelled') NOT NULL DEFAULT 'pending',
	`eventDate` varchar(20),
	`venue` text,
	`specialRequirements` text,
	`customerName` varchar(255) NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`customerPhone` varchar(20),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
