## Flatadango Movie Theater 
A modern, interactive web application for managing and purchasing movie tickets at Flatiron Movie Theater.


## Overview
Flatadango is a full-featured movie theater application that allows users to browse films, view detailed information, purchase tickets, and manage the movie catalog. The application demonstrates modern web development practices with a clean separation of concerns between HTML structure and JavaScript functionality.

## Features
1.Movie Catalog: Browse all available films in an intuitive sidebar

2.Detailed Movie Views: Comprehensive movie information with posters, runtime, showtimes, and descriptions

3.Ticket Purchasing: One-click ticket buying with real-time availability updates

4.Sold Out Management: Automatic sold-out status when tickets are exhausted

5.Movie Management: Delete films from the catalog with confirmation dialogs

## User Experience
Responsive Design: Optimized for desktop, tablet, and mobile devices

Real-time Updates: Instant UI synchronization across all components

Loading States: Smooth animations during data operations

Visual Feedback: Toast notifications for user actions

Accessible Interface: Clean, intuitive design with clear visual hierarchy

## Technologies
Frontend: HTML,JavaScript

Styling: css

Backend: JSON Server (REST API simulation)

Build Tools: None required 

## Installation
Prerequisites
Node.js and npm installed on your system

Modern web browser (Chrome, Firefox, Safari, Edge)

Setup Steps
Clone or Download the Project

bash
## Create project directory
mkdir flatadango
cd flatadango
Install JSON Server

bash
npm install -g json-server
Set up Project Files

Save index.html and script.js in your project directory

Save your db.json file in the same directory

Start the Backend Server

bash
json-server --watch db.json --port 3000
Launch the Application

Open index.html in your web browser

The app will automatically connect to http://localhost:3000

## Usage
-Browsing Movies
-The application loads with the first movie displayed by default

-Click any movie in the sidebar to view its details

-Browse through runtime, showtimes, descriptions, and available tickets

-Purchasing Tickets
Select a movie with available tickets

-Click the "Buy Ticket" button

Watch the available ticket count decrease in real-time

Movies automatically mark as "Sold Out" when no tickets remain


## Getting Started
Follow the installation steps above

Ensure JSON server is running on port 3000

Open the application in your browser

Start browsing movies and purchasing tickets!


## Support
If you have any questions or need help with setup :

Check the troubleshooting section

Open an issue on GitHub

Contact: (castrokimaru@gmail.com)

Built using HTML, CSS, and JavaScript.

## Flatadango - Your gateway to the best movie experience at Flatiron Theater!
