Attendance System
This project is a simple school attendance management system with login functionality, built using:

Backend: Java Spring Boot REST API

Frontend: HTML and JavaScript (client pages)

Authentication: JWT token-based login

Project Structure
server/ - Backend Spring Boot server code

client/ - Frontend client pages (login and home)

docs/ - Screenshots and documentation

Setup and Run Instructions
Backend (Spring Boot)
Open a terminal and navigate to the server folder:


cd server
Build and run the Spring Boot application:

If using the included Maven wrapper:


./mvnw spring-boot:run
Or, if you have Maven installed globally:


mvn spring-boot:run
Once started, the backend server will run at:


http://localhost:8080
Frontend (Client)
Open a new terminal window and navigate to the client folder:


cd client
Open the index.html file in your web browser. You can either:

Double-click the file to open it directly, or

Serve it using a simple HTTP server (for example, with the VSCode Live Server extension).

The frontend will connect to the backend API at:


http://localhost:8080
Testing Login Credentials
Use the following credentials to test the login functionality:

Username	Password
admin	password123
user1	testpass

Features
Login screen with input fields for username and password

Validation for invalid username or password with error messages

Successful login returns a JWT token and redirects to the home page

Home page displays a welcome message and a logout button

Logout clears the user session and redirects back to the login page

Automatic redirect to the login page if the user is not authenticated

Automatic redirect to the home page if the user is already logged in

