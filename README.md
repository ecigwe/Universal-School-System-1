# The Universal School System API

## About The API
The API itself can be found [here](https://universal-school-system.herokuapp.com/).

This API is specifically designed for powering the universal school mobile application. The application ensures that schools can hold lectures and carry on other essential school activities in a virtual environment.

Click the link to see the documentation on [postman](https://documenter.getpostman.com/view/9735977/SzmmUaLA)

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
* Logged in Users can update their password, anytime they like, especially if their current password is compromised.
  
### Staff Roles
* A school staff can either be a principal or a vice-principal or a teacher or a form-teacher or a bursar.
* If you do not specify your role, the default is teacher. 

### Schools
* Schools can be registered on the platform.
* All registered schools can be seen.
* The details of a registered school can be viewed.
* The information of a registered school can be updated.
* Registered schools can be deleted from the application.

### Users

### Administrators
* Information about all the company's administrators can be seen.
* Information about each administrative officer of the company can be seen.
* Information about each administrative officer of the company can be updated.
* Information about each administrative officer of the company can be deleted.* 

### Books
* Books can be added by individual schools.
* Books added by a school can only be seen by the staff and students of the school.
* Each school can update the details of any book which they added.
* Each school could delete a specific book they created.

### Questions
* Questions can be addedd by staff of individual schools.
* Questions added by a school can only be seen by the satff of the school.
* Studnents' access to questions are controlled.
* Each question added by a school can be edited by the staff of the school.
* Questions added by a school can be deleted by the staff of the school.

### Assessments
* Assessments (Exams, Classwork, Quiz, Assignment) can be added by staff of individual schools.
* Assessments added by a school can only be seen by staff or students of the school.
* Students' access to assessments are limited.
* Assessments added by a school can only be edited by the staff of the school.
* Assessments added by a school can be deleted by staff of the school.

### Each API Endpoint And Their Purpose
This API has routes, each of which are dedicated to a single objective. The endpoints make use of HTTP response codes to indicate the API status and errors.

| Endpoint                                              | Function                                          |
| ----------------------------------------------------- | ------------------------------------------------- |
| GET/                                                  | Check to ensure that the api can be accessed      |
| GET/api/v1/schools                                    | Retrieve all the registered schools               |
| POST/api/v1/schools                                   | Register a new school                             |
| GET/api/v1/schools/:id                                | Retrieve a specific school                        |
| PATCH/api/v1/schools/:id                              | Update a specific school                          |
| DELETE/api/v1/schools/:id                             | Delete a specific school                          |
| POST/api/v1/student/register                          | Register a student                                |
| POST/api/v1/student/login                             | Login a student                                   |
| GET/api/v1/logout                                     | Logout a user                                     |
| POST/api/v1/parent/register                           | Register a parent                                 |
| POST/api/v1/parent/login                              | Login a parent                                    |
| POST/api/v1/staff/register                            | Register a staff                                  |
| POST/api/v1/staff/login                               | Login a staff                                     |
| POST/api/v1/admin/register                            | Register an admin                                 |
| POST/api/v1/admin/login                               | Login an admin                                    |
| GET/api/v1/users/admins                               | See all the administrators                        |
| GET/api/v1/users/admins/:id                           | See a specific administrator                      |
| PATCH/api/v1/users/admins/:id                         | Update a specific administrator                   |
| DELETE/api/v1/users/admins/:id                        | Delete an administrator                           |
| PATCH/api/v1/update_my_password                       | Update logged in user's password                  |
| GET/api/v1/school/:id/books                           | Retrieves all the books for a school              |
| GET/api/vi/school/:id/books/:book_id                  | Retrieves a single book for a school              |
| POST/api/v1/school/:id/books                          | Creates a new book for a school                   |
| PATCH/api/vi/school/:id/books/:book_id                | Updates the details of a book for a school        |
| DELETE/api/vi/school/:id/books/:book_id               | Deltes a specific book for a school               |
| GET/api/vi/school/:id/questions                       | Retrieves all the questions for a school          |
| GET/api/vi/school/:id/questions/:question_id          | Retrieves a single question fro a school          |
| POST/api/vi/school/:id/questions                      | Creates a new question for a school               |
| PATCH/api/vi/school/:id/questions/:question_id        | Updates a specific question for a school          |
| DELETE/api/vi/school/:id/questions/:question_id       | Deltes a specific question for a school           |
| GET/api/vi/school/:id/assessments                     | Retrieves all assessments for a school            |
| GET/api/vi/school/:id/assessments/:assessment_id      | Retrieves a specifc assessment for a school       |
| POST/api/vi/school/:id/assessments                    | Creates a new assessment for a school             |
| PATCH/api/vi/school/:id/assessments/:assessment_id    | Updates a specific assessment for a school        |
| DELETE/api/vi/school/:id/assessments/:assessment_id   | Deletes a specific assessment for a school        |


### Sample Requests and Responses From The API
- [Authenticate](#authenticate)
    - [Register Admin](#register-admin)
    - [Login Admin](#login-admin)
    - [Register Parent](#register-parent)
    - [Login Parent](#login-parent)
    - [Register Student](#register-student)
    - [Login Student](#login-student)
    - [Register Staff](#register-staff)
    - [Login Staff](#login-staff)
    - [Logout](#logout)
    - [Update Password](#update-password)

- [School](#school)
    - [Register School](#register-school)
    - [Retrieve Schools](#retrieve-schools)
    - [Retrieve School](#retrieve-school)
    - [Update School](#update-school)
    - [Delete School](#delete-school)

- [Users](#users)
    - [Retrieve Admins](#retrieve-admins)
    - [Retrieve Admin](#retrieve-admin)
    - [Update Admin](#update-admin)
    - [Delete Admin](#delete-admin)

### Authenticate

### Register Admin
* Request
    * Endpoint: POST/api/v1/admin/register
    * Body: (application/json)
    ```
        {
        "fullname": "Femi Aghe",
        "email": "olufemiaghe@gmail.com",
        "username": "Femi90",
        "phoneNumber": "09014058821",
        "role": "manager",
        "password": "{{PASSWORD}}",
        "confirmPassword": "{{PASSWORD}}",
        "adminCode": "{{ADMIN_CODE}}"
    }
    ```

* Response
    * Status: 201 - created
    * Body: application/json
    ```
    {
        "status": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzc4Mjc4MWI5ZGJjMTEwMDdmZDZmMyIsImNhdGVnb3J5IjoiQWRtaW4iLCJpYXQiOjE1OTAxMzMzNzQsImV4cCI6MTU5NzkwOTM3NH0.Y3vmzyFbvD59ZM6lH-9HHeQGcZGDp6xby587IEFlTTc",
        "data": {
            "user": {
                "isAnAdmin": true,
                "role": "manager",
                "category": "Admin",
                "_id": "5ec782781b9dbc11007fd6f3",
                "fullname": "Femi Aghe",
                "email": "olufemiaghe@gmail.com",
                "username": "Femi90",
                "phoneNumber": "09014058821",
                "password": "$2a$12$u/YNuXkH9jUANTS.CSVPHe1tuFK1rdKFbJy7JonOwJEBM/le35oxK",
                "__v": 0
            }
        }
    }
    ```

### Login Admin
* Request
    * Endpoint: POST/api/v1/admin/login
    * Body: (application/json)
    ```
        {
            "username": "Abuchi76",
            "password": "{{PASSWORD}}"
        }
    ```

* Response
    * Status: 200 - success
    * Body: application/json
    ```
    {
        "status": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzRkMmE3MTllODMwMWYwODk3ZDZjYSIsImNhdGVnb3J5IjoiQWRtaW4iLCJpYXQiOjE1OTAxMTk1MDgsImV4cCI6MTU5Nzg5NTUwOH0.VT1pwjaLQOENcInEuWxyzYiXPDL4ZcW3sivb1UvLdyc",
        "data": {
            "user": {
                "role": "backend-developer",
                "category": "Admin",
                "_id": "5ec4d2a719e8301f0897d6ca",
                "fullname": "Abuchi Kingsley",
                "email": "abuchikingsley76@gmail.com",
                "username": "Abuchi76",
                "phoneNumber": "09064058821",
                "password": "$2a$12$SLz8YK7AeE2uhH7iRiJdl.vFGZ02INM4UTxQik5Dd5o7dRRefa3CC",
                "__v": 0
            }
        }
    }
    ```

### Register Parent
* Request
    * Endpoint: POST/api/v1/parent/register
    * Body: (application/json)
    ```
        {
            "fullname": "Patience Dibiagwu",
            "email": "patiencedibiagwu@gmail.com",
            "username": "Patience20",
            "phoneNumber": "09052923471",
            "password": "{{PASSWORD}}",
            "confirmPassword": "{{PASSWORD}}"
        }
    ```

* Response
    * Status: 201 - created
    * Body: application/json
    ```
    {
        "status": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzc0OWRiYjMwOTJiMDAxNzIzYzRlZSIsImNhdGVnb3J5IjoiUGFyZW50IiwiaWF0IjoxNTkwMTE4ODc1LCJleHAiOjE1OTc4OTQ4NzV9.xcL4X8ZzLRelwKtDnuTo65cTJqw0pBTuNRTzhUAv5Oo",
        "data": {
            "user": {
                "role": "Parent",
                "category": "Parent",
                "active": true,
                "_id": "5ec749dbb3092b001723c4ee",
                "fullname": "Patience Dibiagwu",
                "email": "patiencedibiagwu@gmail.com",
                "username": "Patience20",
                "phoneNumber": "09052923471",
                "password": "$2a$12$5PTodyTWO1jD/zGXEWLWoOzlwZtG8iyNYiGvu28ylPFLvGJYU4SpG",
                "registrationDate": "2020-05-22T03:41:15.237Z",
                "__v": 0
            }
        }
    }
    ```

### Login Parent
* Request
    * Endpoint: POST/api/v1/parent/login
    * Body: (application/json)
    ```
        {
            "username":"Patience20",
            "password": "{{PASSWORD}}"
        }
    ```

* Response
    * Status: 200 - success
    * Body: application/json
    ```
    {
        "status": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzc0OWRiYjMwOTJiMDAxNzIzYzRlZSIsImNhdGVnb3J5IjoiUGFyZW50IiwiaWF0IjoxNTkwMTE4OTg0LCJleHAiOjE1OTc4OTQ5ODR9.y0_Z-iX1Icvg8vfbcr3gD7S4R87I1i0tJtRYLmOmSvE",
        "data": {
            "user": {
                "role": "Parent",
                "category": "Parent",
                "_id": "5ec749dbb3092b001723c4ee",
                "fullname": "Patience Dibiagwu",
                "email": "patiencedibiagwu@gmail.com",
                "username": "Patience20",
                "phoneNumber": "09052923471",
                "password": "$2a$12$5PTodyTWO1jD/zGXEWLWoOzlwZtG8iyNYiGvu28ylPFLvGJYU4SpG",
                "registrationDate": "2020-05-22T03:41:15.237Z",
                "__v": 0
            }
        }
    }
    ```

### Register Student
* Request
    * Endpoint: POST/api/v1/student/register
    * Body: (application/json)
    ```
        {
            "fullname": "Ephraim Junior",
            "email": "ephraimjunior@gmail.com",
            "username": "Ephraim32",
            "phoneNumber": "09067202271",
            "dateOfBirth": "2004-10-22",
            "schoolName": "Shalom Academy",
            "schoolAddress": "No 16, Otedola Street, Ikorodu, Lagos State",
            "parentPhoneNumber": "09064058820",
            "class": "SS3",
            "password": "{{PASSWORD}}",
            "confirmPassword": "{{PASSWORD}}"
        }
    ```

* Response
    * Status: 201 - created
    * Body: application/json
    ```
    {
        "status": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzc0NmY0YzBiNzU2MDAxNzUxNTk2NCIsImNhdGVnb3J5IjoiU3R1ZGVudCIsImlhdCI6MTU5MDExODEzMiwiZXhwIjoxNTk3ODk0MTMyfQ.gMxTmDqCfCzZvB-eILLXAIYASKW6fGLy5SnojKpnarE",
        "data": {
            "user": {
                "role": "Student",
                "category": "Student",
                "activeStudent": true,
                "_id": "5ec746f4c0b7560017515964",
                "fullname": "Ephraim Junior",
                "email": "ephraimjunior@gmail.com",
                "username": "Ephraim32",
                "phoneNumber": "09067202271",
                "dateOfBirth": "2004-10-22T00:00:00.000Z",
                "school": "5ec9d41615e2a217c87a9c94",
                "parent": "5ec9d53015e2a217c87a9cf1",
                "class": "SS3",
                "password": "$2a$12$RQzD7I1VtYc0JkKSIlDnIuXJJmxhxhuYp6exh5xHltucdfR8SFs.m",
                "registrationDate": "2020-05-22T03:28:52.273Z",
                "age": 15,
                "__v": 0
            }
        }
    }
    ```

### Login Student
* Request
    * Endpoint: POST/api/v1/student/login
    * Body: (application/json)
    ```
        {
            "username": "Ephraim32",
            "password": "{{PASSWORD}}"
        }
    ```

* Response
    * Status: 200 - success
    * Body: application/json
    ```
    {
        "status": "success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzc0NmY0YzBiNzU2MDAxNzUxNTk2NCIsImNhdGVnb3J5IjoiU3R1ZGVudCIsImlhdCI6MTU5MDExODI0MCwiZXhwIjoxNTk3ODk0MjQwfQ.pN2K2BPzYGlgg7xqTbcFj1P7zZOqszkoI3MlCT8D9Qo",
        "data": {
            "user": {
                "role": "Student",
                "category": "Student",
                "_id": "5ec746f4c0b7560017515964",
                "fullname": "Ephraim Junior",
                "email": "ephraimjunior@gmail.com",
                "username": "Ephraim32",
                "phoneNumber": "09067202271",
                "dateOfBirth": "2004-10-22T00:00:00.000Z",
                "school": "5ec9d41615e2a217c87a9c94",
                "parent": "5ec9d53015e2a217c87a9cf1",
                "class": "SS3",
                "password": "$2a$12$RQzD7I1VtYc0JkKSIlDnIuXJJmxhxhuYp6exh5xHltucdfR8SFs.m",
                "registrationDate": "2020-05-22T03:28:52.273Z",
                "age": 15,
                "__v": 0
            }
        }
    }
    ```

### Register Staff
* A school staff can either be a principal or a vice-principal or a teacher or a form-teacher or a bursar.
* If you do not specify your role, the default is teacher. 

* Request
    * Endpoint: POST/api/v1/staff/register
    * Body: (application/json)
    ```
        {
            "fullname": "Pan Peter",
            "email": "panpeter@gmail.com",
            "username": "Pan10",
            "phoneNumber": "09029202271",
            "schoolName": "Orient Academy",
            "schoolAddress": "No 160, Gbenga Street, Ikorodu, Lagos State",
            "subjects": ["History", "Government"],
            "classes": ["SS1", "SS2", "SS3"],
            "password": "{{PASSWORD}}",
            "confirmPassword": "{{PASSWORD}}"
        }
    ```

* Response
    * Status: 201 - created
    * Body: application/json
    ```
    {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzc0YjM4YjMwOTJiMDAxNzIzYzRlZiIsImNhdGVnb3J5IjoiU3RhZmYiLCJpYXQiOjE1OTAxMTkyMjUsImV4cCI6MTU5Nzg5NTIyNX0.drm7xbHzolh8Pyo0UfgCqubItLVb9blMh6u7KvRiOlc",
    "data": {
                "user": {
                    "role": "Teacher",
                    "category": "Staff",
                    "subjects": [
                        "History",
                        "Government"
                    ],
                    "classes": [
                        "SS1",
                        "SS2",
                        "SS3"
                    ],
                    "active": true,
                    "_id": "5ec74b38b3092b001723c4ef",
                    "fullname": "Pan Peter",
                    "email": "panpeter@gmail.com",
                    "username": "Pan10",
                    "phoneNumber": "09029202271",
                    "school": "5ec9d41615e2a217c87a9c94",
                    "password": "$2a$12$lFe6V.GIsS/yFfFCDCvjZOTlrfB3zXit6DWMAbHh5Imss8YErVc52",
                    "registrationDate": "2020-05-22T03:47:04.707Z",
                    "__v": 0
                }
            }
        }
    ```

### Login Staff
* Request
    * Endpoint: POST/api/v1/staff/login
    * Body: (application/json)
    ```
        {
            "username": "Pan10",
            "password": "{{PASSWORD}}"
        }
    ```

* Response
    * Status: 200 - success
    * Body: application/json
    ```
    {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzc0YjM4YjMwOTJiMDAxNzIzYzRlZiIsImNhdGVnb3J5IjoiU3RhZmYiLCJpYXQiOjE1OTAxMTkzODUsImV4cCI6MTU5Nzg5NTM4NX0.BCHHLdhmQVQUHyCrYVNb0te1ne2uX1ndi-WNg6up4FI",
    "data": {
        "user": {
            "role": "Teacher",
            "category": "Staff",
            "subjects": [
                "History",
                "Government"
            ],
            "classes": [
                "SS1",
                "SS2",
                "SS3"
            ],
            "_id": "5ec74b38b3092b001723c4ef",
            "fullname": "Pan Peter",
            "email": "panpeter@gmail.com",
            "username": "Pan10",
            "phoneNumber": "09029202271",
            "school: "5ec75054350903001742747e",
            "password": "$2a$12$lFe6V.GIsS/yFfFCDCvjZOTlrfB3zXit6DWMAbHh5Imss8YErVc52",
            "registrationDate": "2020-05-22T03:47:04.707Z",
            "__v": 0
        }
    }
    ```

### Logout
* Request
    * Endpoint: GET/api/v1/logout
    * Body: (application/json)


* Response
    * Status: 200 - success
    * Body: application/json
    ```
    {
        "status": "success",
        "message": "successfully logged out",
        "token": null
    }
    ```

### Update Password

Only for users who are logged in.

* Request:
    * Endpoint: PATCH/api/v1/update_my_password
    * Body: (application/json)
    ```
    {
        "currentPassword": "{{CURRENTPASSWORD}},
        "newPassword": "{{NEWPASSWORD}}",
        "confirmNewPassword": "{{NEWPASSWORD}}"
    }
    ```

* Response:
    * Status: 200 - success
    * Body: (application/json)
    ```
    {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2IwNTZlMmIwZGZlMTc0NDQ3NTI4ZCIsImNhdGVnb3J5IjoiUGFyZW50IiwiaWF0IjoxNTkwMzY2MjgwLCJleHAiOjE1OTgxNDIyODB9.xMYH5xcrd7jJYeynpIoIYNDWOiEHZ_jdj0ErEwPU5Aw",
    "data": {
            "user": {
                "role": "Parent",
                "category": "Parent",
                "_id": "5ecb056e2b0dfe174447528d",
                "fullname": "Patience Dibiagwu",
                "email": "patiencedibiagwu@gmail.com",
                "username": "Patience20",
                "phoneNumber": "09052923471",
                "registrationDate": "2020-05-24T23:38:22.883Z",
                "__v": 0,
                "passwordChangedAt": "2020-05-25T00:23:23.918Z"
            }
        }
    }
    ```

### School

### Register School
* Request
    * Endpoint: POST/api/v1/schools
    * Body: (application/json)
    ```
    { 
      "admin": "Boawada15",
      "name": "Hilltop Academy",
      "address": "1032 Canning Street, London, England",
      "population": 5532,
      "email": "hilltopacademy@gmail.com",
      "phoneNumber": "08062142380",
      "imageUrl": "wwww.schoolimage.com/schimg.jpg"
    }
    ```

* Response
    * Status: 201 - created
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "School successfully created",
        "data": {
            "isSubscribed": false,
            "_id": "5ec75054350903001742747e",
            "admin": "Boawada15",
            "name": "Hilltop Academy",
            "address": "1032 Canning Street, London, England",
            "population": 5532,
            "email": "hilltopacademy@gmail.com",
            "phoneNumber": "08062142380",
            "imageUrl": "wwww.schoolimage.com/schimg.jpg",
            "registeredOn": "2020-05-22T04:08:52.000Z",
            "__v": 0
        }
    }
    ```
  
### Retrieve Schools
* Request
    * Endpoint: GET/api/v1/schools

* Response
    * Status: 200 - success
    * Body(application/json)
    ```
    {
        "status": "success",
        "message": "Schools retrieved successfully",
        "results": "2 documents",
        "data": [
            {
                "isSubscribed": false,
                "_id": "5ec74f55350903001742747d",
                "admin": "Rapu55",
                "name": "Marist Academy",
                "address": "1057 DT, London, England",
                "population": 4599,
                "email": "marist@email.com",
                "phoneNumber": "08062158380",
                "imageUrl": "wwww.example.com/ex.jpg",
                "registeredOn": "2020-05-22T04:04:37.000Z",
                "__v": 0
            },
            {
                "isSubscribed": false,
                "_id": "5ec75054350903001742747e",
                "admin": "Boawada15",
                "name": "Hilltop Academy",
                "address": "1032 Canning Street, London, England",
                "population": 5532,
                "email": "hilltopacademy@gmail.com",
                "phoneNumber": "08062142380",
                "imageUrl": "wwww.schoolimage.com/schimg.jpg",
                "registeredOn": "2020-05-22T04:08:52.000Z",
                "__v": 0
            }
        ]
    }
    ```
  
### Retrieve School
* Request
    * Endpoint: GET/api/v1/schools/5ec74f55350903001742747d
  
* Response
    * Status: 200
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "School retrieved successfully",
        "results": 1,
        "data": {
            "isSubscribed": false,
            "_id": "5ec74f55350903001742747d",
            "admin": "Rapu55",
            "name": "Marist Academy",
            "address": "1057 DT, London, England",
            "population": 4599,
            "email": "marist@email.com",
            "phoneNumber": "08062158380",
            "imageUrl": "wwww.example.com/ex.jpg",
            "registeredOn": "2020-05-22T04:04:37.000Z",
            "__v": 0
        }
    }
    ```
  
### Update School
* Request
    * Endpoint: PATCH/api/v1/schools/5ec74f55350903001742747d
    * Body: (application/json)
    ```
    {
      "population": 4407
    }
    ```

* Response
    * Status: 200 - success
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "School updated successfully",
        "results": 1,
        "data": {
            "isSubscribed": false,
            "_id": "5ec74f55350903001742747d",
            "admin": "Rapu55",
            "name": "Marist Academy",
            "address": "1057 DT, London, England",
            "population": 4407,
            "email": "marist@email.com",
            "phoneNumber": "08062158380",
            "imageUrl": "wwww.example.com/ex.jpg",
            "registeredOn": "2020-05-22T04:04:37.000Z",
            "__v": 0
        }
    }
    ```
  
### Delete School
* Request
    * Endpoint: DELETE/api/v1/schools/5ec74f55350903001742747d
  
* Response
    * Status: 204 - No Content
  
### Users

### Retrieve Admins
* Request
    * Endpoint: GET/api/v1/users/admins

* Response
    * Status: 200 - success
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Successfully retrieved all the administrators",
            "results": 2,
            "data": [
                {
                    "isAnAdmin": true,
                    "role": "backend-developer",
                    "category": "Admin",
                    "_id": "5ec92d57d94fa51314fddfbd",
                    "fullname": "Diai Immanuel Onyeka",
                    "email": "immanueldiai@gmail.com",
                    "username": "Immanuel5015",
                    "phoneNumber": "09064058820",
                    "__v": 0
                },
                {
                    "isAnAdmin": true,
                    "role": "backend-developer",
                    "category": "Admin",
                    "_id": "5ec92d57d94fa51314fddfbc",
                    "fullname": "Abuchi Kingsley Ndinigwe",
                    "email": "abuchikings@hotmail.com",
                    "username": "abuchikingsley76",
                    "phoneNumber": "08062158380",
                    "__v": 0
                }
            ]
        }
    ```

### Retrieve Admin

* Request:
    * Endpoint: GET/api/v1/users/admins/5ec92d57d94fa51314fddfbc

* Response:
    * Status: 200 - success
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Retrieved Administrator Diai Immanuel Onyeka",
        "results": 1,
        "data": {
            "isAnAdmin": true,
            "role": "backend-developer",
            "category": "Admin",
            "_id": "5ec92d57d94fa51314fddfbd",
            "fullname": "Diai Immanuel Onyeka",
            "email": "immanueldiai@gmail.com",
            "username": "Immanuel5015",
            "phoneNumber": "09064058820",
            "__v": 0
        }
    }
    ```

### Update Admin

* Request:
    * Endpoint: PATCH/api/v1/users/admins/5ec92d57d94fa51314fddfbd
    * Body: (application/json)
    ```
    {
        "username": "Immanuel50"
    }
    ```

* Response
    * Status: 200 - success
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Updated Administrator Diai Immanuel Onyeka",
        "results": 1,
        "data": {
            "isAnAdmin": true,
            "role": "backend-developer",
            "category": "Admin",
            "_id": "5ec92d57d94fa51314fddfbd",
            "fullname": "Diai Immanuel Onyeka",
            "email": "immanueldiai@gmail.com",
            "username": "Immanuel50",
            "phoneNumber": "09064058820",
            "__v": 0
        }
    }
    ```

### Delete Admin

* Request:
    * Endpoint: DELETE/api/v1/users/admins/5ec92d57d94fa51314fddfbd
  
* Response:
    * Status: 204 - no content
