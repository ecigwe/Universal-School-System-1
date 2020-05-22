# The Universal School System API

## About The API
This API is specifically designed for powering the universal school mobile application. The application ensures that schools can hold lectures and carry on other essential school activities in a virtual environment.

## Local Development
The universal school system API requires node version 10 and above to run successfully.

The following steps must be undertaken in order for the code of this project to work as intended.

```
1. Clone the repo to your local machine using the **git clone repo url** command.
2. Using the terminal, navigate to the cloned directory **cd Universal-School-System**
3. Install all the project's dependencies and devDependencies using the **npm install -d** command.
4. Create a mongoDB database on mongodb atlas and insert your connection string in your own local .env file
5. Start the server, using the command **npm start**.
7. Congratulations, your api should be up and running.
```

## Tools and Technologies Used For This Project
* Node (JavaScript Runtime)
* Express (Node Framework)
* MongoDB (Database)

## API Features
This API consists of the features indicated below:

### Authentication
* This API makes use of Json web tokens for authentication.
* The users of this application are assigned a unique token upon a successful register or login operation. This token is very important for later HTTP requests to the API for authentication.  Requests to the API that are carried out without authentication (when authentication is needed) will recieve a fail json response with the status code 401: Unauthorized Access. The token should be attached to the request's header as the value of the authorization key. 
* The token goes through a verification process, anytime a logged in user wants to have access to special resources that are reserved for authenticated users.
* When clients make a request to the logout endpoint a **null token** is returned in the json response.
* Administrators, students, staff and parents have different authentication handlers.
* A single person cannot be registered twice for one collection. For instance, a teacher who is already registered, cannot register again as a teacher, but can register as a parent.

### Staff Roles
* A school staff can either be a principal or a vice-principal or a teacher or a form-teacher or a bursar.

### Schools
* Schools can be registered on the platform.
* All registered schools can be seen.
* The details of a registered school can be viewed.
* The information of a registered school can be updated.
* Registered schools can be deleted from the application.

### Each API Endpoint And Their Purpose
This API has routes, each of which are dedicated to a single objective. The endpoints make use of HTTP response codes to indicate the API status and errors.

| Endpoint                     | Function                                     |
| ---------------------------- | -------------------------------------------- |
| GET/                         | Check to ensure that the api can be accessed |
| GET/api/v1/schools           | Retrieve all the registered schools          |
| POST/api/v1/schools          | Register a new school                        |
| GET/api/v1/schools/:id       | Retrieve a specific school                   |
| PATCH/api/v1/schools/:id     | Update a specific school                     |
| DELETE/api/v1/schools/:id    | Delete a specific school                     |
| POST/api/v1/student/register | Register a student                           |
| POST/api/v1/student/login    | Login a student                              |
| GET/api/v1/logout            | Logout a user                                |
| POST/api/v1/parent/register  | Register a parent                            |
| POST/api/v1/parent/login     | Login a parent                               |
| POST/api/v1/staff/register   | Register a staff                             |
| POST/api/v1/staff/login      | Login a staff                                |
| POST/api/v1/admin/register   | Register an admin                            |
| POST/api/v1/admin/login      | Login an admin                               |