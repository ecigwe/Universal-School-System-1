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
5. Create environment variables for the following:
     NODE_ENV
     PORT
     MONGODB_URI
     JWT_EXPIRATION_TIMEFRAME
     JWT_EXPIRY_TIME
     SECRET
     ADMIN_CODE
     TWILIO_ACCOUNT_SID
     TWILIO_AUTH_TOKEN
     TWILIO_PHONE_NUMBER
6. Start the server, using the command **npm start**.
7. Congratulations, your api should be up and running.
```

## Tools and Technologies Used For This Project
* Node (JavaScript Runtime)
* Express (Node Framework)
* MongoDB (Database)
* TWILIO (Sending Text Messages)

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
  
### Notice

When a user registers with the platform, the user must verify the phone number that was used in the creation of the account.

To achieve this, the logged in user must make a get request to the */api/v1/users/me/verification_code/* endpoint to get a verification code.

The logged in user, then makes a post request with the verification code to the */api/v1/users/me/verify_my_account/* endpoint to verify his or her account.

From then on, the user can have access to any resource on the platform that is accessible to users with verified accounts.

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
* Any logged in user can see their own information
* Any logged in user can update their own information
* Any logged in user can delete their own information 

### Administrators
* Information about all the company's administrators can be seen.
* Information about each administrative officer of the company can be seen.
* Information about each administrative officer of the company can be updated.
* Information about each administrative officer of the company can be deleted.
* Please note the administrators in this case refers to the people involved in the running of the company. The admin of a school is an entirely different administrator whose admin role is restricted to his school.

### Students
* Every school can see the data of all of it's students
* Each school can see the data of a single student
* The details of a school's student can be updated
* The details of a school's student can be deleted

### Staff
* Every school can see the data of all of it's staff
* Each school can see the data of a single staff official
* The details of a school's staff can be updated
* The details of a school's staff can be deleted


### Parents
* Every school can see the data of all the parents who have children as students in that school.
* The details of a parent can be retrieved
* The details of a parent can be updated
* The details of a parent can be deleted

### Resetting User Passwords
* The user must first make a post request to the forgot password route with their phone number.
* They will recieve a code in a text message.
* They must send that code, their new password and a confirmation of that new password in a patch request to the reset password route.
* If the code is vaild and it's time limit has not expired, the user's password will be successfully reset and the user will be logged in automatically.
* There are different reset password endpoints for the application's administrators, school's staff officials, students and parents

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

### Classrooms
* Every school can create classes.
* The different classes that make up a school can be retrieved.
* The details of a sepcific class can be seen.
* The details of a specific class can be updated.
* The details of a specific class can be deleted. 

### Lecture Timetables
* Every school can create a lecture timetable for each class that make up the school.
* All the lecture timetables that make up a school can be retrieved.
* The lecture timetable of a sepcific class can be seen.
* The details of the lecture timetable of a specific class can be updated.
* The details of the lecture timetable of a  specific class can be deleted.

### Personal Study Timetables
To peform this kind of activity on the app, the registered student or staff who has verified his or her account phone number needs to be logged in.

A student or a staff cannot create a new timetable, when he or she has an existing one. He or she would have to delete the current one to make way for the new. 

* Every registered student or staff can create a personal timetable for studying.
* Every registered student or staff can fetch their personal studying timetable.
* Every registered student or staff can update their personal studying timetable.
* Every registered student or staff can delete their personal studying timetable.

### Permissions For Accesssing Resources

The administrators of the application have access to all the resources in the system.

### Accessing Students Information
* A student can access (read update and delete) his or her own information but cannot access the information of other students
* Staff can access (read update and delete) the information of a student if that student belongs to their school.
* A parent can access (read update and delete) the information of a student, if that student is his or her child.
* Staff can see all the students of their school. 

### Accessing Administrators Information
* The public has access to the information of all the administrators of the universal school system project.
* Each admin can update and delete only their own data.

### Accessing Parents Information
* Every parent can see update and delete their own information.
* Every staff can see (not update and delete) the data of a parent whose child is a student in his or her school.
* Every student can see (not update and delete ) the information of their parent.
* Every staff can see the information of all the parents that have at least a child in their school.

### Accessing Staff Information
* Every staff of a school can see the information of other staff officials of thesame school.
* Every student of a school can see the details of their staff officials.
* Every parent can see the details of any staff official whose school is attended by their children.
* A staff official can update and delete their information.

### Accessing School Information
* A registered School-Administrator can add a new school to the platform.
* All staff officials and students can see the details of their school. Moreso, parents who have a child as a student in a school can see that school's information.
* A registered School-Administrator can update the details of his school.
* A registered School-Administrator can delete the details of his school.
* Only the application's administrators can see all the schools that are registered on the application.

### Accessing Books
* Only A Staff Of A School Can Add Books For That School.
* Only A Staff Of A School Can Update A  Book For That School.
* Only A Staff Of A School Can Delete A Book For That School.
* Books For A School Can Be Accessed By The School's Staff Officials, The Students And The Student's Parent.  

### Accessing Questions
* Only A Staff Of A School Can Add Questions For That School.
* Only A Staff Of A School Can Update A Question For That School.
* Only A Staff Of A School Can Delete A Question For That School. 
* Questions For A School Can Be Accessed By The School's Staff Officials, The Students And The Student's Parent.   

### Accessing Assessments
* Only A Staff Of A School Can Add Assessments For That School.
* Only A Staff Of A School Can Update An Assessment For That School.
* Only A Staff Of A School Can Delete An Assessment For That School. 
* Assessments For A School Can Be Accessed By The School's Staff Officials, The Students And The Student's Parent. 

### Accessing Classrooms
* Only The Administrator, Principal or Vice-Principal Of A School Can Add Classrooms For That School.
* Only The Administrator, Principal or Vice-Principal or The Class Form Teacher Of A School Can Update A Classroom For That School.
* Only The Administrator, Principal or Vice-Principal Of A School Can Delete A Classroom For That School. 
* All the Classrooms Of A School Can Be Accessed By The Administrator, Principal or Vice-Principal Of That School.
* The Details Of A Specific Classroom Can Be Seen By The School Administrator, Principal, Vice-Principal, The Classroom Form Teacher, The Class Students. 

### Accessing Study Timetables
* A Student or a staff can interact only with the study timetable that he or she has created.

### Accessing Lecture Timetables
* Only A School Administrator or Principal or Vice-Principal or Class Form Teacher Can Create A Lecture Timetable For A Class.
* Only A School Administrator or Principal or Vice-Principal or Class Form Teacher Can Update A Lecture Timetable For A Class.
* Only A School Administrator or Principal or Vice-Principal or Class Form Teacher Can Delete A Lecture Timetable For A Class.
* All The Lecture Timetables Pertaninig to A School Can Be Accessed By The Administrator, Principal or Vice-Principal Of That School.
* The Details Of A Specific Lecture Timetable Can Be Seen By The School Administrator, Principal, Vice-Principal, The Classroom Form Teacher and The Class Students. 

### Each API Endpoint And Their Purpose
This API has routes, each of which are dedicated to a single objective. The endpoints make use of HTTP response codes to indicate the API status and errors.

| Endpoint                                                      | Function                                                                   |
| ------------------------------------------------------------- | -------------------------------------------------------------------------- |
| GET/                                                          | Check to ensure that the api can be accessed                               |
| GET/api/v1/schools                                            | Retrieve all the registered schools                                        |
| POST/api/v1/schools                                           | Register a new school                                                      |
| GET/api/v1/schools/:id                                        | Retrieve a specific school                                                 |
| PATCH/api/v1/schools/:id                                      | Update a specific school                                                   |
| DELETE/api/v1/schools/:id                                     | Delete a specific school                                                   |
| POST/api/v1/student/register                                  | Register a student                                                         |
| POST/api/v1/student/login                                     | Login a student                                                            |
| GET/api/v1/logout                                             | Logout a user                                                              |
| POST/api/v1/parent/register                                   | Register a parent                                                          |
| POST/api/v1/parent/login                                      | Login a parent                                                             |
| POST/api/v1/staff/register                                    | Register a staff                                                           |
| POST/api/v1/staff/login                                       | Login a staff                                                              |
| POST/api/v1/admin/register                                    | Register an admin                                                          |
| POST/api/v1/admin/login                                       | Login an admin                                                             |
| GET/api/v1/users/me/verification_code                         | Get Verification Code                                                      |
| POST/api/v1/users/me/verify_my_account                        | Verification Of Account With Verification Code                             |
| GET/api/v1/users/admins                                       | See all the administrators                                                 |
| GET/api/v1/users/admins/:id                                   | See a specific administrator                                               |
| PATCH/api/v1/users/admins/:id                                 | Update a specific administrator                                            |
| DELETE/api/v1/users/admins/:id                                | Delete an administrator                                                    |
| PATCH/api/v1/update_my_password                               | Update logged in user's password                                           |
| GET/api/v1/schools/:id/students                               | See all the students of a school                                           |
| GET/api/v1/schools/:id/students/:student_id                   | See a single school's student's data                                       |
| PATCH/api/v1/schools/:id/students/:student_id                 | Update a single school's student's data                                    |
| DELETE/api/v1/schools/:id/students/:student_id                | Delete a single school's student's data                                    |
| GET/api/v1/schools/:id/staff                                  | See all the staff of a school                                              |
| GET/api/v1/schools/:id/staff/:staff_id                        | See a single school's staff official's data                                |
| PATCH/api/v1/schools/:id/staff/:staff_id                      | Update a single school's staff official's data                             |
| DELETE/api/v1/schools/:id/staff/:staff_id                     | Delete a single school's staff official's data                             |
| GET/api/v1/schools/:id/parents                                | Retrieve all the parents whose children are students of the school         |
| GET/api/v1/users/parents/:id                                  | Retrieve the details of a single parent                                    |
| PATCH/api/v1/users/parents/:id                                | Update a specific parent                                                   |
| DELETE/api/v1/users/parents/:id                               | Delete a parent from the platform                                          |
| POST/api/v1/admin/forgot_password                             | An Admin user forgets his password and recieves a reset code               |
| PATCH/api/v1/admin/reset_password                             | An Admin user is finally able to reset his password                        |
| POST/api/v1/staff/forgot_password                             | An Staff of a school forgets his or her password and recieves a reset code |
| PATCH/api/v1/staff/reset_password                             | A Staff official is finally able to reset his or her password              |
| POST/api/v1/student/forgot_password                           | A Student forgets his or her password and recieves a reset code            |
| PATCH/api/v1/student/reset_password                           | A Student is finally able to reset his or her password                     |
| POST/api/v1/parent/forgot_password                            | A Parent forgets his or her password and recieves a reset code             |
| PATCH/api/v1/parent/reset_password                            | A Parent is finally able to reset his or her password                      |
| GET/api/v1/users/me                                           | A logged in user can see their information                                 |
| PATCH/api/v1/users/me                                         | A logged in user can update their data                                     |
| DELETE/api/v1/users/me                                        | A logged in user can delete their data                                     |
| GET/api/v1/schools/:id/books                                  | Retrieves all the books for a school                                       |
| GET/api/vi/schools/:id/books/:book_id                         | Retrieves a single book for a school                                       |
| POST/api/v1/schools/:id/books                                 | Creates a new book for a school                                            |
| PATCH/api/vi/schools/:id/books/:book_id                       | Updates the details of a book for a school                                 |
| DELETE/api/vi/schools/:id/books/:book_id                      | Deltes a specific book for a school                                        |
| GET/api/vi/schools/:id/questions                              | Retrieves all the questions for a school                                   |
| GET/api/vi/schools/:id/questions/:question_id                 | Retrieves a single question fro a school                                   |
| POST/api/vi/schools/:id/questions                             | Creates a new question for a school                                        |
| PATCH/api/vi/schools/:id/questions/:question_id               | Updates a specific question for a school                                   |
| DELETE/api/vi/schools/:id/questions/:question_id              | Deltes a specific question for a school                                    |
| GET/api/vi/schools/:id/assessments                            | Retrieves all assessments for a school                                     |
| GET/api/vi/schools/:id/assessments/:assessment_id             | Retrieves a specifc assessment for a school                                |
| POST/api/vi/schools/:id/assessments                           | Creates a new assessment for a school                                      |
| PATCH/api/vi/schools/:id/assessments/:assessment_id           | Updates a specific assessment for a school                                 |
| DELETE/api/vi/schools/:id/assessments/:assessment_id          | Deletes a specific assessment for a school                                 |
| GET/api/v1/schools/:id/classes                                | Retrieves all classes for a school                                         |
| GET/api/vi/schools/:id/classes/:class_id                      | Retrieves a specifc class for a school                                     |
| POST/api/vi/schools/:id/classes                               | Creates a new class for a school                                           |
| PATCH/api/vi/schools/:id/classes/:class_id                    | Updates a specific class for a school                                      |
| DELETE/api/vi/schools/:id/classes/:class_id                   | Deletes a specific class for a school                                      |
| POST/api/v1/users/me/study_timetable                          | Create a study timetable                                                   |
| GET/api/v1/users/me/study_timetable                           | Fetch my study timetable                                                   |
| PATCH/api/v1/users/me/study_timetable                         | Update my study timetable                                                  |
| DELETE/api/v1/users/me/study_timetable                        | Delete my study timetable                                                  |
| POST/api/v1/schools/:id/classes/:class_id/lecture_timetable   | Create a lecture timetable for a specific class                            |
| GET/api/v1/schools/:id/classes/lecture_timetables             | Retrieve all the lecture timetables for every class in a particular school |
| GET/api/v1/schools/:id/classes/:class_id/lecture_timetable    | Retrieve the lecture timetable for a specific class                        |
| PATCH/api/v1/schools/:id/classes/:class_id/lecture_timetable  | Update the lecture timetable for a specific class                          |
| DELETE/api/v1/schools/:id/classes/:class_id/lecture_timetable | Delete the lecture timetable for a specific class                          |





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
    - [Verification Code](#verification-code)
    - [Verify Account](#verify-account)
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
    - [Retrieve Students](#retrieve-students)
    - [Retrieve Student](#retrieve-student)
    - [Update Student](#update-student)
    - [Delete Student](#delete-student)
    - [Retrieve Officials](#retrieve-officials)
    - [Retrieve Staff](#retrieve-staff)
    - [Update Staff](#update-staff)
    - [Delete Staff](#delete-staff)
    - [Retrieve Parents](#retrieve-parents)
    - [Retrieve Parent](#retrieve-parent)
    - [Update Parent](#update-parent)
    - [Delete Parent](#delete-parent)
    - [Get Me](#get-me)
    - [Update Me](#update-me)
    - [Delete Me](#delete-me) 

 - [Resetting Passwords](#resetting-passwords)
    - [Forgot Password](#forgot-password)
    - [Reset Password](#reset-password)


- [Books](#books)
    - [Retrieve Books](#retrieve-books)
    - [Retrieve Book](#retrieve-book)
    - [Create Book](#create-book)
    - [Update Book](#update-book)
    - [Delete Book](#delete-book)

- [Questions](#questions)
    - [Retrieve Questions](#retrieve-questions)
    - [Retrieve Question](#retrieve-question)
    - [Create Question](#create-question)
    - [Update Question](#update-question)
    - [Delete question](#delete-question)

- [Assessments](#assessments)
    - [Retrieve Assessments](#retrieve-assessments)
    - [Retrieve Assessment](#retrieve-assessment)
    - [Create Assessment](#create-assessment)
    - [Update Assessment](#update-assessment)
    - [Delete Assessment](#delete-assessment)

- [Classes](#classes)
    - [Retrieve Classes](#retrieve-classes)
    - [Retrieve Class](#retrieve-class)
    - [Create Class](#create-class)
    - [Update Class](#update-class)
    - [Delete Class](#delete-class)

- [Study Timetable](#study-timetable)
    - [Create Timetable](#create-timetable)
    - [Fetch Timetable](#fetch-timetable)
    - [Update Timetable](#update-timetable)
    - [Delete Timetable](#delete-timetable)

- [Lecture Timetable](#lecture-timetable)
    - [Create Lecture Timetable](#create-lecture-timetable)
    - [Fetch All Timetables](#fetch-all-timetables)
    - [Fetch Lecture Timetable](#fetch-lecture-timetable)
    - [Update Lecture Timetable](#update-lecture-timetable)
    - [Delete Lecture Timetable](#delete-lecture-timetable)

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
        "phoneNumber": "9014058821",
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
                "phoneNumber": "+2349014058821",
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
                "phoneNumber": "+2349064058821",
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
            "phoneNumber": "9052923471",
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
                "phoneNumber": "+2349052923471",
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
                "phoneNumber": "+2349052923471",
                "password": "$2a$12$5PTodyTWO1jD/zGXEWLWoOzlwZtG8iyNYiGvu28ylPFLvGJYU4SpG",
                "registrationDate": "2020-05-22T03:41:15.237Z",
                "__v": 0
            }
        }
    }
    ```

### Register Student

If your parent is already registered on the platform, it is recommended that you provide their phone number. However, this is not required.

When the parent has registered on the platform, the student can update his or her account details to include his or her parent's phoneNumber, using the **updateMe** endpoint.

If the student puts in the wrong parent phone number, when updating his or her account an error will be returned.

A student cannot be connected to any parent whose phone number they do not provide.

* Request
    * Endpoint: POST/api/v1/student/register
    * Body: (application/json)
    ```
        {
            "fullname": "Ephraim Junior",
            "email": "ephraimjunior@gmail.com",
            "username": "Ephraim32",
            "phoneNumber": "9067202271",
            "dateOfBirth": "2004-10-22",
            "schoolName": "Shalom Academy",
            "schoolAddress": "No 16, Otedola Street, Ikorodu, Lagos State",
            "class": "SS3",
            "parentPhoneNumber": "8170517151",
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
                "phoneNumber": "+2349067202271",
                "dateOfBirth": "2004-10-22T00:00:00.000Z",
                "school": "5ec9d41615e2a217c87a9c94",
                "parent": "5ecb08e3d2595416f0dc9989",
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
                "phoneNumber": "+2349067202271",
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
* A school staff can either be a school-administrator or a principal or a vice-principal or a teacher or a form-teacher or a bursar.
* If you do not specify your role, the default is teacher. 

The School-Administrator does not have to specify the school name and address, when signing up, because the school may not be in existence yet,
since it is the School-Administrator who registers a school with the platform after creating his or her account.

When the school has been registered, the School-Administrator can update his account details to include the school name and address, using the **updateMe** endpoint

If the School-Administrator puts in the wrong school name and address, when updating his or her account an error will be returned. 

A staff cannot be connected to a school when they do not provide the school name and address.

* Request
    * Endpoint: POST/api/v1/staff/register
    * Body: (application/json)
    ```
        {
            "fullname": "Pan Peter",
            "email": "panpeter@gmail.com",
            "username": "Pan10",
            "phoneNumber": "9029202271",
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
                    "phoneNumber": "+2349029202271",
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
            "phoneNumber": "+2349029202271",
            "school: "5ec75054350903001742747e",
            "password": "$2a$12$lFe6V.GIsS/yFfFCDCvjZOTlrfB3zXit6DWMAbHh5Imss8YErVc52",
            "registrationDate": "2020-05-22T03:47:04.707Z",
            "__v": 0
        }
    }
    ```

### Verification Code

Only for registered users who are logged in and have not verified their accounts.

* Request:
    * Endpoint: GET/api/v1/users/me/verification_code

* Response:
    * Status: 200 - ok
    * Body: (application/json)
     ```
     {
        "status": "Success",
        "message": "Your verification code has been sent to your mobile phone as a text message",
        "verificationCode": "e33b8d"
    }
     ```

### Verify Account

Only for registered and logged in users who have not yet verified their phone numbers and have recieved a verification code on their mobile phone in a text message.

* Request:
    * Endpoint: POST/api/v1/users/me/verify_my_account
    * Body: (application/json)
     ```
     {
        "verificationCode": "e33b8d"
    }
     ```
* Response:
    * Status: 200 - ok
    * Body: (application/json)
     ```
     {
        "status": "Success",
        "message": "Your account has been successfully verified."
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
                "phoneNumber": "+2349052923471",
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
      "phoneNumber": "+2348062142380",
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
            "phoneNumber": "+2348062142380",
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
                "phoneNumber": "+2348062158380",
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
                "phoneNumber": "+2348062142380",
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
            "phoneNumber": "+2348062158380",
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
            "phoneNumber": "+2348062158380",
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
                    "phoneNumber": "+2349064058820",
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
                    "phoneNumber": "+2348062158380",
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
            "phoneNumber": "+2349064058820",
            "__v": 0
        }
    }
    ```

### Update Admin

An admin cannot update his or her password using this endpoint. He or she must use the update_my_password endpoint.

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
            "phoneNumber": "+2349064058820",
            "__v": 0
        }
    }
    ```

### Delete Admin

* Request:
    * Endpoint: DELETE/api/v1/users/admins/5ec92d57d94fa51314fddfbd
  
* Response:
    * Status: 204 - no content

### Retrieve Students
* Request: 
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9977/students/

* Response:
    * Status: 200 - ok
    * Body:(application/json)
    ```
    {
        "status": "success",
        "message": "Successfully retrieved all the students",
        "results": 9,
        "data": [
            {
                "role": "Student",
                "category": "Student",
                "_id": "5ecc155fdd53ff1604ef823a",
                "fullname": "Musa Ogechi Doyle",
                "email": "musageorge@gmail.com",
                "username": "musageorge72",
                "phoneNumber": "+2348170217049",
                "dateOfBirth": "2006-02-16T23:00:00.000Z",
                "class": "SS 3",
                "parent": "5ecb08e3d2595416f0dc9988",
                "school": "5ecb08dfd2595416f0dc9977",
                "age": 14,
                "__v": 0
            },
            {
                "role": "Student",
                "category": "Student",
                "_id": "5ecc155fdd53ff1604ef8236",
                "fullname": "Amara Chikaodili Mohammed",
                "email": "amaraatanda@outlook.com",
                "username": "amaraatanda14",
                "phoneNumber": "+2347069816913",
                "dateOfBirth": "2006-05-07T23:00:00.000Z",
                "class": "Basic 2",
                "parent": "5ecb08e3d2595416f0dc9984",
                "school": "5ecb08dfd2595416f0dc9977",
                "age": 14,
                "__v": 0
            },
            {
                "role": "Student",
                "category": "Student",
                "_id": "5ecc155fdd53ff1604ef8237",
                "fullname": "Ngozi Chikaodili Edet",
                "email": "ngoziobiwuru@gmail.com",
                "username": "ngoziobiwuru77",
                "phoneNumber": "+2347069916947",
                "dateOfBirth": "2002-10-08T23:00:00.000Z",
                "class": "Basic 3",
                "parent": "5ecb08e3d2595416f0dc9985",
                "school": "5ecb08dfd2595416f0dc9977",
                "age": 17,
                "__v": 0
            },
            {
                "role": "Student",
                "category": "Student",
                "_id": "5ecc155fdd53ff1604ef8238",
                "fullname": "Amake Habbeeb George",
                "email": "amakemohammed@aol.com",
                "username": "amakemohammed72",
                "phoneNumber": "+2347070016981",
                "dateOfBirth": "2003-07-07T23:00:00.000Z",
                "class": "Basic 2",
                "parent": "5ecb08e3d2595416f0dc9986",
                "school": "5ecb08dfd2595416f0dc9977",
                "age": 16,
                "__v": 0
            },
            {
                "role": "Student",
                "category": "Student",
                "_id": "5ecc155fdd53ff1604ef8239",
                "fullname": "Wasiu Ngozi Obi",
                "email": "wasiuedet@outlook.com",
                "username": "wasiuedet9",
                "phoneNumber": "+2347070117015",
                "dateOfBirth": "2008-07-06T23:00:00.000Z",
                "class": "SS 2",
                "parent": "5ecb08e3d2595416f0dc9987",
                "school": "5ecb08dfd2595416f0dc9977",
                "age": 11,
                "__v": 0
            },
            {
                "role": "Student",
                "category": "Student",
                "_id": "5ecc155fdd53ff1604ef8232",
                "fullname": "Amanda Gboyega Babatunde",
                "email": "amandababatunde@hotmail.com",
                "username": "amandababatunde68",
                "phoneNumber": "+2347069416777",
                "dateOfBirth": "2008-10-31T23:00:00.000Z",
                "class": "Basic 3",
                "parent": "5ecb08e3d2595416f0dc997e",
                "school": "5ecb08dfd2595416f0dc9977",
                "age": 11,
                "__v": 0
            },
            {
                "role": "Student",
                "category": "Student",
                "_id": "5ecc155fdd53ff1604ef8234",
                "fullname": "Esther Eketi Atanda",
                "email": "esthermonday@hotmail.com",
                "username": "esthermonday5",
                "phoneNumber": "+2348169616845",
                "dateOfBirth": "2006-08-17T23:00:00.000Z",
                "class": "SS 3",
                "parent": "5ecb08e3d2595416f0dc9982",
                "school": "5ecb08dfd2595416f0dc9977",
                "age": 13,
                "__v": 0
            },
            {
                "role": "Student",
                "category": "Student",
                "_id": "5ecc155fdd53ff1604ef8235",
                "fullname": "Iniobong Aisha Obiwuru",
                "email": "iniobongokeke@aol.com",
                "username": "iniobongokeke1",
                "phoneNumber": "+2349069716879",
                "dateOfBirth": "2003-03-27T23:00:00.000Z",
                "class": "Basic 3",
                "parent": "5ecb08e3d2595416f0dc9983",
                "school": "5ecb08dfd2595416f0dc9977",
                "age": 17,
                "__v": 0
            },
            {
                "role": "Student",
                "category": "Student",
                "_id": "5ecc155fdd53ff1604ef8233",
                "fullname": "Eketi Folake Okeke",
                "email": "eketiayantola@gmail.com",
                "username": "eketiayantola53",
                "phoneNumber": "+2349069516811",
                "dateOfBirth": "2007-04-06T23:00:00.000Z",
                "class": "Basic 2",
                "parent": "5ecb08e3d2595416f0dc9981",
                "school": "5ecb08dfd2595416f0dc9977",
                "age": 13,
                "__v": 0
            }
        ]
    }
    ```

### Retrieve Student
* Request: 
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9977/students/5ecc155fdd53ff1604ef823a
  
* Response:
    * Status: 200 - ok
    * Body(application/json):
    ```
    {
        "status": "success",
        "message": "Successfully retrieved the student's details",
        "results": 1,
        "data": {
            "role": "Student",
            "category": "Student",
            "_id": "5ecc155fdd53ff1604ef823a",
            "fullname": "Musa Ogechi Doyle",
            "email": "musageorge@gmail.com",
            "username": "musageorge72",
            "phoneNumber": "+2348170217049",
            "dateOfBirth": "2006-02-16T23:00:00.000Z",
            "class": "SS 3",
            "parent": "5ecb08e3d2595416f0dc9988",
            "school": "5ecb08dfd2595416f0dc9977",
            "age": 14,
            "__v": 0
        }
    }
    ```

### Update Student

A student cannot update his or her password using this endpoint. He or she must use the update_my_password endpoint.

* Request: 
    * Endpoint: PATCH/api/v1/schools/5ecb08dfd2595416f0dc9977/students/5ecc155fdd53ff1604ef823a
    * Body: (application/json):
    ```
    {
        "username": "musageorge"
    }
    ```

* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Successfully updated student's details",
        "results": 1,
        "data": {
            "role": "Student",
            "category": "Student",
            "_id": "5ecc155fdd53ff1604ef823a",
            "fullname": "Musa Ogechi Doyle",
            "email": "musageorge@gmail.com",
            "username": "musageorge",
            "phoneNumber": "+2348170217049",
            "dateOfBirth": "2006-02-16T23:00:00.000Z",
            "class": "SS 3",
            "parent": "5ecb08e3d2595416f0dc9988",
            "school": "5ecb08dfd2595416f0dc9977",
            "age": 14,
     }
   ```  
### Delete Student
* Request:
    * Endpoint: DELETE/api/v1/schools/5ecb08dfd2595416f0dc9977/students/5ecc155fdd53ff1604ef823a

* Response: 
    * Status: 204 - no content
    
### Books

### Retrieve Books
* Request
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9975/books

* Response
    * Status: 200 - OK
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Books retrieved successfully",
            "results": 10,
            "data": [
                {
                    "_id": "5ecd2a995f77980c30fcdee1",
                    "class": "Senior Secondary",
                    "price": 2500,
                    "title": "New School Physics",
                    "author": "M Anyakoha",
                    "category": "Textbook",
                    "bookUrl": "www.example.com",
                    "imageUrl": "www.books",
                    "createdOn": "2020-05-26T14:41:29.000Z",
                    "school": "5ecb08dfd2595416f0dc9975",
                    "__v": 0
                },
                {
                    "_id": "5ecd77f766a24726186138e2",
                    "class": "SS 3",
                    "price": 3000,
                    "title": "New School Chemistry",
                    "author": "Osei Yaw Ababio",
                    "category": "Textbook",
                    "bookUrl": "www.example.com",
                    "imageUrl": "www.books.com",
                    "createdOn": "2020-05-26T20:11:35.000Z",
                    "school": "5ecb08dfd2595416f0dc9975",
                    "__v": 0
                }
                ...
            ]
        }
    ```

### Retrieve Book
* Request
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9975/books/5ecd2a995f77980c30fcdee1

* Response
    * Status: 200 - OK
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Book retrieved successfully",
            "results": 1,
            "data": {
                    "_id": "5ecd2a995f77980c30fcdee1",
                    "class": "Senior Secondary",
                    "price": 2500,
                    "title": "New School Physics",
                    "author": "M Anyakoha",
                    "category": "Textbook",
                    "bookUrl": "www.example.com",
                    "imageUrl": "www.books",
                    "createdOn": "2020-05-26T14:41:29.000Z",
                    "school": "5ecb08dfd2595416f0dc9975",
                    "__v": 0
                }
        }
    ```

### Create Book
* Request
    * Endpoint: POST/api/v1/schools/5ecb08dfd2595416f0dc9975/books
    * Body: (application/json)
    ```
    { 
        "title":"The Enchanted Wood",
        "author":"Enyd Blyton",
        "class":"Any",
        "category": "Novel",
        "price": 1200,
        "bookUrl":"www.example.com/books",
        "imageUrl": "www.books.com/the-enchanted-wood.jpg"
    }
    ```

* Response
    * Status: 201 - Created
    * Body: (application/json)
    ```
    {
       "status": "success",
        "message": "Book created successfully",
        "results": 1,
        "data": {
            "price": 1200,
            "_id": "5ed0dbb8a9c89b2410fddb62",
            "title": "The Enchanted Wood",
            "author": "Enyd Blyton",
            "class": "Any",
            "category": "Novel",
            "bookUrl": "www.example.com/books",
            "imageUrl": "www.books.com/the-enchanted-wood.jpg",
            "createdOn": "2020-05-29T09:54:00.000Z",
            "school": "5ecb08dfd2595416f0dc9975",
            "__v": 0
        }
    }
    ```

 ### Update Book
* Request
    * Endpoint: PATCH/api/v1/schools/5ecb08dfd2595416f0dc9975/books/5ed0dbb8a9c89b2410fddb62
    * Body: (application/json)
    ```
    {
        "author": "E. Blyton",
        "price": 1000
    }
    ```

* Response
    * Status: 200 - OK
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Book was updated successfully",
            "results": 1,
            "data": {
                "_id": "5ed0dbb8a9c89b2410fddb62",
                "price": 1000,
                "title": "The Enchanted Wood",
                "author": "E. Blyton",
                "class": "Any",
                "category": "Novel",
                "bookUrl": "www.example.com/books",
                "imageUrl": "www.books.com/the-enchanted-wood.jpg",
                "createdOn": "2020-05-29T09:54:00.000Z",
                "school": "5ecb08dfd2595416f0dc9975",
                "__v": 0
            }
        }
    ```

### Delete Book

* Request:
    * Endpoint: DELETE/api/v1/schools/5ecb08dfd2595416f0dc9975/books/5ed0dbb8a9c89b2410fddb62
  
* Response:
    * Status: 204 - No Content

### Retrieve Officials
* Request:
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9976/staff
  
* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Successfully retrieved all the staff officials",
        "results": 9,
        "data": [
            {
                "role": "Principal",
                "category": "Staff",
                "subjects": [
                    "Accounting",
                    "Biology"
                ],
                "classes": [
                    "Basic 1",
                    "SS 2"
                ],
                "_id": "5ecc14f1dd53ff1604ef81e2",
                "fullname": "Amake Yemi Solarin",
                "email": "amakesolarin@outlook.com",
                "username": "amakesolarin63",
                "phoneNumber": "+2348170417117",
                "school": "5ecb08dfd2595416f0dc9976",
                "__v": 0
            },
            {
                "role": "Vice-Principal",
                "category": "Staff",
                "subjects": [
                    "Geography",
                    "Geography"
                ],
                "classes": [
                    "SS 3",
                    "Basic 2"
                ],
                "_id": "5ecc14f1dd53ff1604ef81e3",
                "fullname": "Azeez Moses Obasola",
                "email": "azeezobasola@outlook.com",
                "username": "azeezobasola27",
                "phoneNumber": "+2347070517151",
                "school": "5ecb08dfd2595416f0dc9976",
                "__v": 0
            },
            {
                "role": "Bursar",
                "category": "Staff",
                "subjects": [
                    "Mathematics",
                    "Accounting"
                ],
                "classes": [
                    "Basic 3",
                    "Basic 3"
                ],
                "_id": "5ecc14f1dd53ff1604ef81e5",
                "fullname": "Bunmi Mary Obasola",
                "email": "bunmiobasola@gmail.com",
                "username": "bunmiobasola21",
                "phoneNumber": "+2349070717219",
                "school": "5ecb08dfd2595416f0dc9976",
                "__v": 0
            },
            {
                "role": "Form-Teacher",
                "category": "Staff",
                "subjects": [
                    "Basic science",
                    "Geography"
                ],
                "classes": [
                    "SS 3",
                    "SS 3"
                ],
                "_id": "5ecc14f1dd53ff1604ef81e6",
                "fullname": "Mary Chioma Lawnson",
                "email": "marylawnson@aol.com",
                "username": "marylawnson50",
                "phoneNumber": "+2349070817253",
                "school": "5ecb08dfd2595416f0dc9976",
                "__v": 0
            },
            {
                "role": "Form-Teacher",
                "category": "Staff",
                "subjects": [
                    "Accounting",
                    "Biology"
                ],
                "classes": [
                    "SS 3",
                    "SS 1"
                ],
                "_id": "5ecc14f1dd53ff1604ef81e7",
                "fullname": "Sunday Chiamaka Eze",
                "email": "sundayeze@hotmail.com",
                "username": "sundayeze10",
                "phoneNumber": "+2348170917287",
                "school": "5ecb08dfd2595416f0dc9976",
                "__v": 0
            },
            {
                "role": "Form-Teacher",
                "category": "Staff",
                "subjects": [
                    "Basic science",
                    "Mathematics"
                ],
                "classes": [
                    "Basic 3",
                    "SS 3"
                ],
                "_id": "5ecc14f1dd53ff1604ef81e8",
                "fullname": "Eketi Habbeeb Abdul",
                "email": "eketiabdul@gmail.com",
                "username": "eketiabdul38",
                "phoneNumber": "+2347071017321",
                "school": "5ecb08dfd2595416f0dc9976",
                "__v": 0
            },
            {
                "role": "Teacher",
                "category": "Staff",
                "subjects": [
                    "Hausa Language",
                    "Hausa Language"
                ],
                "classes": [
                    "Basic 3",
                    "Basic 1"
                ],
                "_id": "5ecc14f1dd53ff1604ef81e9",
                "fullname": "Folake Funsho Awolowo",
                "email": "folakeawolowo@gmail.com",
                "username": "folakeawolowo3",
                "phoneNumber": "+2347071117355",
                "school": "5ecb08dfd2595416f0dc9976",
                "__v": 0
            },
            {
                "role": "Teacher",
                "category": "Staff",
                "subjects": [
                    "Mathematics",
                    "Basic science"
                ],
                "classes": [
                    "Basic 2",
                    "Basic 3"
                ],
                "_id": "5ecc14f1dd53ff1604ef81ea",
                "fullname": "John Habbeeb Olanrewaju",
                "email": "johnolanrewaju@aol.com",
                "username": "johnolanrewaju68",
                "phoneNumber": "+2349071217389",
                "school": "5ecb08dfd2595416f0dc9976",
                "__v": 0
            },
            {
                "role": "Teacher",
                "category": "Staff",
                "subjects": [
                    "Physics",
                    "Accounting"
                ],
                "classes": [
                    "SS 3",
                    "SS 1"
                ],
                "_id": "5ecc14f1dd53ff1604ef81eb",
                "fullname": "Musa Emeka Doyle",
                "email": "musadoyle@aol.com",
                "username": "musadoyle77",
                "phoneNumber": "+2347071317423",
                "school": "5ecb08dfd2595416f0dc9976",
                "__v": 0
            }
        ]
    }
    ```

### Retrieve Staff

* Request:
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9976/staff/5ecc14f1dd53ff1604ef81e2
    
* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
        {
        "status": "success",
        "message": "Successfully retrieved the official's details",
        "results": 1,
        "data": {
            "role": "Principal",
            "category": "Staff",
            "subjects": [
                "Accounting",
                "Biology"
            ],
            "classes": [
                "Basic 1",
                "SS 2"
            ],
            "_id": "5ecc14f1dd53ff1604ef81e2",
            "fullname": "Amake Yemi Solarin",
            "email": "amakesolarin@outlook.com",
            "username": "amakesolarin63",
            "phoneNumber": "+2348170417117",
            "school": "5ecb08dfd2595416f0dc9976",
            "__v": 0
        }
    }
    ```

### Update Staff

A staff cannot update his or her password using this endpoint. He or she must use the update_my_password endpoint.

* Request:
    * Endpoint: PATCH/api/v1/schools/5ecb08dfd2595416f0dc9976/staff/5ecc14f1dd53ff1604ef81e2
    * Body: (application/json)
    ```
    {
        "subjects": [
            "Mathematics",
            "Hausa Language",
            "English Language"
            ]
    }
    ```
    
* Response:
    * Status: 200 - ok
    * Body: (application/json)
```
{
  "status": "success",
  "message": "Successfully updated staff information",
  "results": 1,
  "data": {
      "role": "Principal",
      "category": "Staff",
      "subjects": [
          "Mathematics",
          "Hausa Language",
          "English Language"
      ],
      "classes": [
          "Basic 1",
          "SS 2"
      ],
      "_id": "5ecc14f1dd53ff1604ef81e2",
      "fullname": "Amake Yemi Solarin",
      "email": "amakesolarin@outlook.com",
      "username": "amakesolarin63",
      "phoneNumber": "08170417117",
      "school": "5ecb08dfd2595416f0dc997"
 }
```
 ### Delete Staff

* Request:
    * Endpoint: DELETE/api/v1/schools/5ecb08dfd2595416f0dc9976/staff/5ecc14f1dd53ff1604ef81e2

* Response:
    * Status: 204 - no content  

### Questions

### Retrieve Questions
* Request
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9975/questions

* Response
    * Status: 200 - OK
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Questions retrieved successfully",
            "results": 2,
            "data": [
                {
                    "_id": "5ecf7b9a525ab2125c2b9789",
                    "createdOn": "2020-05-28T08:51:38.000Z",
                    "subject": "Economics",
                    "class": "Basic3",
                    "category": "Assignment",
                    "question": "In which of the following situations do we have a free good?  ",
                    "options": {
                                "a": "At zero price, more is demanded than supplied  ",
                                "b": "At zero price, quantity supplied exceeds quantity demanded  ",
                                "c": "At equilibrium price, quantity supply is equal to quantity demanded. ",
                                "d": "Any quantity can be obtained when the price is low "
                            },
                    "answer": "b",
                    "points": 4,
                    "school": "5ecb08dfd2595416f0dc9975",
                    "__v": 0
                },
                {
                    "_id": "5ecf7b9a525ab2125c2b97a1",
                    "createdOn": "2020-05-28T08:51:38.000Z",
                    "subject": "Government",
                    "class": "Basic3",
                    "category": "Classwork",
                    "question": "The reason behind Nigeria’s suspension from the Commonwealth in 1995 was",
                    "options": {
                        "a": "legal",
                        "b": "political",
                        "c": "economic",
                        "d": "socio-cultural"
                    },
                    "answer": "b",
                    "points": 4,
                    "school": "5ecb08dfd2595416f0dc9975",
                    "__v": 0
                }
            ]
        }
    ```
    
### Retrieve Question
* Request
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9975/questions/5ecf7b9a525ab2125c2b96fc

* Response
    * Status: 200 - OK
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Question retrieved successfully",
            "results": 1,
            "data": {
                "_id": "5ecf7b9a525ab2125c2b96fc",
                "createdOn": "2020-05-28T08:51:38.000Z",
                "subject": "Physics",
                "class": "SS1",
                "category": "Exam",
                "question": "The postulate of Dalton’s atomic theory which still holds is that",
                "options": {
                    "a": "Atoms can neither be created nor destroyed",
                    "c": "Atoms are the tiniest known elements",
                    "b": "The particles of the same element are exactly alike",
                    "d": "All atoms are of the same weight"
                },
                "answer": "a",
                "points": 2,
                "school": "5ecb08dfd2595416f0dc9975",
                "__v": 0
            }   
        }
    ```

### Create Question
* Request
    * Endpoint: POST/api/v1/schools/5ecb08dfd2595416f0dc9975/questions
    * Body: (application/json)
    ```
    {
        "subject": "History",
        "class": "SS2",
        "category": "Exam",
     	"question": "The introduction of indirect rule in eastern Nigeria led to the Aba Women Riots of  ",
     	"options": {
         	"a": "1914",
         	"b": "1929",
         	"c": "1935",
         	"d": "1916"
     	},
     	"answer": "b",
     	"points": 2
     }
    ```

* Response
    * Status: 201 - Created
    * Body: (application/json)
    ```
    {
        "status": "success",
        message": "Question created successfully",
        "results": 1,
        "data": {
            "_id": "5ed10b84aa3e3e21acf51f88",
            "subject": "History",
            "class": "SS2",
            "category": "Exam",
            "question": "The introduction of indirect rule in eastern Nigeria led to the Aba Women Riots of  ",
            "options": {
                "a": "1914",
                "b": "1929",
                "c": "1935",
                "d": "1916"
            },
            "answer": "b",
            "points": 2,
            "createdOn": "2020-05-29T13:17:56.000Z",
            "school": "5ecb08dfd2595416f0dc9975",
            "__v": 0
        }
    }
    ```

### Update Question
* Request
    * Endpoint: PATCH/api/v1/schools/5ecb08dfd2595416f0dc9975/questions/5ed10b84aa3e3e21acf51f88
    * Body: (application/json)
    ```
    {
        "options": {
            "a": "1929",
            "b": "1914",
            "c": "1916",
            "d": "None of the above"
        },
        "answer": "a"
    }
    ```

* Response
    * Status: 200 - OK
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Question was updated successfully",
            "results": 1,
            "data": {
                "_id": "5ed10b84aa3e3e21acf51f88",
                "subject": "History",
                "class": "SS2",
                "category": "Exam",
                "question": "The introduction of indirect rule in eastern Nigeria led to the Aba Women Riots of  ",
                "options": {
                    "a": "1929",
                    "b": "1914",
                    "c": "1916",
                    "d": "None of the above"
                },
                "answer": "a",
                "points": 3,
                "createdOn": "2020-05-29T13:17:56.000Z",
                "school": "5ecb08dfd2595416f0dc9975",
                "__v": 0
            }
        }
    ```

### Delete Question

* Request:
    * Endpoint: DELETE/api/v1/schools/5ecb08dfd2595416f0dc9975/questions/5ed10b84aa3e3e21acf51f88
  
* Response:
    * Status: 204 - No Content

### Retrieve Parents
Find all the parents whose children are students in a particular school.
* Request:
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9977/parents
    
* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Successfully retrieved all parents",
        "results": 8,
        "data": [
            {
                "role": "Parent",
                "category": "Parent",
                "_id": "5ecb08e3d2595416f0dc9984",
                "fullname": "Jumoke Kevin Mohammed",
                "email": "jumokemohammed@aol.com",
                "username": "jumokemohammed",
                "phoneNumber": "+2347070016981",
                "__v": 0
            },
            {
                "role": "Guardian",
                "category": "Parent",
                "_id": "5ecb08e3d2595416f0dc9985",
                "fullname": "Yemi Echezona Edet",
                "email": "yemiedet@aol.com",
                "username": "yemiedet",
                "phoneNumber": "+2347070117015",
                "__v": 0
            },
            {
                "role": "Parent",
                "category": "Parent",
                "_id": "5ecb08e3d2595416f0dc9986",
                "fullname": "Esther Teslim George",
                "email": "esthergeorge@aol.com",
                "username": "esthergeorge",
                "phoneNumber": "+2348170217049",
                "__v": 0
            },
            {
                "role": "Parent",
                "category": "Parent",
                "_id": "5ecb08e3d2595416f0dc9987",
                "fullname": "Chinyere Toyin Obi",
                "email": "chinyereobi@aol.com",
                "username": "chinyereobi",
                "phoneNumber": "+2348170317083",
                "__v": 0
            },
            {
                "role": "Parent",
                "category": "Parent",
                "_id": "5ecb08e3d2595416f0dc997e",
                "fullname": "Chinyere Teslim Babatunde",
                "email": "chinyerebabatunde@gmail.com",
                "username": "chinyerebabatunde",
                "phoneNumber": "+2347069416777",
                "__v": 0
            },
            {
                "role": "Parent",
                "category": "Parent",
                "_id": "5ecb08e3d2595416f0dc9982",
                "fullname": "Musa Grace Atanda",
                "email": "musaatanda@aol.com",
                "username": "musaatanda",
                "phoneNumber": "+2349069816913",
                "__v": 0
            },
            {
                "role": "Parent",
                "category": "Parent",
                "_id": "5ecb08e3d2595416f0dc9983",
                "fullname": "Amake Aisha Obiwuru",
                "email": "amakeobiwuru@hotmail.com",
                "username": "amakeobiwuru",
                "phoneNumber": "+2348169916947",
                "__v": 0
            },
            {
                "role": "Guardian",
                "category": "Parent",
                "_id": "5ecb08e3d2595416f0dc9981",
                "fullname": "Ibukun Eketi Okeke",
                "email": "ibukunokeke@hotmail.com",
                "username": "ibukunokeke",
                "phoneNumber": "+2347069716879",
                "__v": 0
            }
        ]
    }
    ```

### Retrieve Parent
* Request:
    * Endpoint: GET/api/v1/users/parents/5ecb08e3d2595416f0dc9984

* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Successfully retrieved the requested information",
        "results": 1,
        "data": {
            "role": "Parent",
            "category": "Parent",
            "_id": "5ecb08e3d2595416f0dc9984",
            "fullname": "Jumoke Kevin Mohammed",
            "email": "jumokemohammed@aol.com",
            "username": "jumokemohammed",
            "phoneNumber": "+2347070016981",
            "__v": 0
        }
    }
    ```

### Update Parent

A parent cannot update his or her password using this endpoint. He or she  must use the update_my_password endpoint.

* Request:
    * Endpoint: PATCH/api/v1/users/parents/5ecb08e3d2595416f0dc9984
    * Body: (application/json)
    ```
    {
        "fullname": "Jumoke Kevin",
        "username":"jumokekevin"
    }
    ```

* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Successfully updated",
        "results": 1,
        "data": {
            "role": "Parent",
            "category": "Parent",
            "_id": "5ecb08e3d2595416f0dc9984",
            "fullname": "Jumoke Kevin",
            "email": "jumokemohammed@aol.com",
            "username": "jumokekevin",
            "phoneNumber": "+2347070016981",
            "__v": 0
        }
    }
    ```

### Delete Parent
* Request:  
    * Endpoint: DELETE/api/v1/users/parents/5ecb08e3d2595416f0dc9984
  
* Response:
    * Status: 204 -  no content

### Get Me

You must be logged in to see your information

* Request:
    * Endpoint: GET/api/v1/users/me

* Response
    * Status - ok
    * Body: (application/json)
     ```
     {
        "status": "success",
        "message": "Successfully retrieved your details",
        "results": 1,
        "data": {
            "role": "Student",
            "category": "Student",
            "_id": "5ecf95f436601f194c3ede77",
            "fullname": "Lawrence Yemi Okeke",
            "email": "lawrenceayantola@gmail.com",
            "username": "lawrenceayantola84",
            "phoneNumber": "+2349074018341",
            "dateOfBirth": "2003-09-22T23:00:00.000Z",
            "class": "Basic 2",
            "parent": "5ecb08e3d2595416f0dc9981",
            "school": "5ecb08dfd2595416f0dc9978",
            "age": 16,
            "__v": 0
        }
    }
     ```

### Update Me

You must be logged in to be able to update your information

Logged in users cannot update their password using this endpoint. They must use the update_my_password endpoint.


* Request:
    * Endpoint: PATCH/api/v1/users/me
    * Body: (application/json)
     ```
     {
        "fullname": "Chinyere Teslim Babatunde",
        "email": "chinyerebabatunde@gmail.com"
    }
     ```
* Response: 
    * Status: 200 - ok
    * Body: (application/json)
     ```
     {
        "status": "success",
        "message": "Successfully updated your details",
        "results": 1,
        "data": {
            "role": "Parent",
            "category": "Parent",
            "_id": "5ecb08e3d2595416f0dc997e",
            "fullname": "Chinyere Teslim Babatunde",
            "email": "chinyerebabatunde@gmail.com",
            "username": "chinyerebabatunde",
            "phoneNumber": "+2347069416777",
            "__v": 0
        }
    }
     ```

### Delete Me

You must be logged in to delete your information

* Request:
    * Endpoint: DELETE/api/v1/users/me
  
* Response:
    * Status: 204 - no content

### Resetting Passwords
The different category of users have different endpoints for resetting their passwords.

However, they must all follow two main steps:

* They make a post request with their phone number to their forgot_password route.
* They send their reset code along with their new password and a confirmation of the new password in a patch request to their reset_password route
  
  This how the forgot_password route of each category of user looks like:
  * For ADMIN: /api/v1/admin/forgot_password
  * For STUDENT: /api/v1/student/forgot_password
  * For PARENT: /api/v1/parent/forgot_password
  * For STAFF: /api/v1/staff/forgot_password

This how the reset_password route of each category of user looks like:
  * For ADMIN: /api/v1/admin/reset_password
  * For STUDENT: /api/v1/student/eset_password
  * For PARENT: /api/v1/parent/eset_password
  * For STAFF: /api/v1/staff/eset_password

For demonstration purposes I will work wth only an admin. 

Rest assured, the other category of users follow thesame pattern, with the exception of having seperate endpoints, which have been explained above.

### Forgot Password
* Request:
    * Endpoint: POST/api/v1/admin/forgot_password
    * Body: (application/json)
    ```
    {
        "phoneNumber": "9064058821"
    }
    ```
* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
    {
        "status": "Success",
        "message": "Your password reset token has been sent to your mobile phone as a text message",
        "resetCode": "{{resetToken}}"
    }
    ```

### Reset Password
* Request:
    * Endpoint: PATCH/api/v1/admin/reset_password
    * Body: (application/json)
    ```
    {
        "resetCode": "{{RESETCODE}}",
        "newPassword": "{{NEWPASSWORD}}",
        "confirmNewPassword": "{{NEWPASSWORD}}"
    }
    ```

* Response:
    * Status: 200 - ok
    * Body: (application/json)
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
                "phoneNumber": "+2349064058821",
                "password": "$2a$12$SLz8YK7AeE2uhH7iRiJdl.vFGZ02INM4UTxQik5Dd5o7dRRefa3CC",
                "passwordChangedAt": "2020-05-25T00:23:23.918Z",
                "__v": 0
            }
        }
    }
    ```

### Assessments

### Retrieve Assessments
* Request
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9975/assessments

* Response
    * Status: 200 - OK
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Assessments retrieved successfully",
            "results": 2,
            "data": [
                {
                    "_id": "5ecfef8920381a1ed88108a8",
                    "questions": [
                        "5ecf7b9a525ab2125c2b96fc",
                        "5ecf7b9a525ab2125c2b9708",
                        "5ecf7b9a525ab2125c2b970c"
                    ],
                    "subject": "Chemistry",
                    "title": "Third Term Examination",
                    "class": "SS2",
                    "category": "Exam",
                    "term": 1,
                    "year": "2025",
                    "percentage": 75,
                    "school": "5ecb08dfd2595416f0dc9975",
                    "createdOn": "2020-05-28T17:06:17.000Z",
                    "__v": 0
                },
                {
                    "_id": "5ecff0e920381a1ed88108a9",
                    "questions": [
                        "5ecf7b9a525ab2125c2b97a1",
                        "5ecfd2c904602111208fa6d8"
                    ],
                    "subject": "Economics",
                    "title": "Classwork",
                    "class": "SS2",
                    "category": "Classwork",
                    "term": 1,
                    "year": "2025",
                    "percentage": 0,
                    "school": "5ecb08dfd2595416f0dc9975",
                    "createdOn": "2020-05-28T17:12:09.000Z",
                    "__v": 3
                }
            ]
        }
    ```    
### Retrieve Assessment
* Request
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9975/assessments/5ecff0e920381a1ed88108a9

* Response
    * Status: 200 - OK
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Assessment retrieved successfully",
            "results": 1,
            "data": {
                "_id": "5ecff0e920381a1ed88108a9",
                "questions": [
                    "5ecf7b9a525ab2125c2b97a1",
                    "5ecfd2c904602111208fa6d8"
                ],
                "subject": "Economics",
                "title": "Classwork",
                "class": "SS2",
                "category": "Classwork",
                "term": 1,
                "year": "2025",
                "percentage": 0,
                "school": "5ecb08dfd2595416f0dc9975",
                "createdOn": "2020-05-28T17:12:09.000Z",
                "__v": 3
            }
        }
    ```    

### Create Assessment
* Request
    * Endpoint: POST/api/v1/schools/5ecb08dfd2595416f0dc9975/assessments
    * Body: (application/json)
    ```
    {
       "subject": "Chemistry",
        "title": "Quiz",
        "class": "SS1",
        "category": "Quiz",
        "questions": ["5ecf7b9a525ab2125c2b96fc", 
            "5ecf7b9a525ab2125c2b9708", "5ecf7b9a525ab2125c2b970c",
            "5ecf7b9a525ab2125c2b970e", "5ecf7b9a525ab2125c2b9719", 
            "5ecf7b9a525ab2125c2b971b", 5ecf7b9a525ab2125c2b971e" 
        ],
        "term": "1",
        "year": "2020",
        "percentage": "10",
        "school": "5ecb08dfd2595416f0dc9975"
     }
    ```

* Response
    * Status: 201 - Created
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Assessment created successfully",
            "results": 1,
            "data": {
                "questions": [
                    "5ecf7b9a525ab2125c2b96fc",
                    "5ecf7b9a525ab2125c2b9708",
                    "5ecf7b9a525ab2125c2b970c",
                    "5ecf7b9a525ab2125c2b970e",
                    "5ecf7b9a525ab2125c2b9719",
                    "5ecf7b9a525ab2125c2b971b",
                    "5ecf7b9a525ab2125c2b971e"
                ],
                "_id": "5ed116aaaa3e3e21acf51f89",
                "subject": "Chemistry",
                "title": "Quiz",
                "class": "SS1",
                "category": "Quiz",
                "term": 1,
                "year": "2020",
                "percentage": 10,
                "school": "5ecb08dfd2595416f0dc9975",
                "createdOn": "2020-05-29T14:05:30.000Z",
                "__v": 0
            }
        }
    ```

### Update Assessment
* Request
    * Endpoint: PATCH/api/v1/schools/5ecb08dfd2595416f0dc9975/assessments/5ed116aaaa3e3e21acf51f89
    * Body: (application/json)
    ```
        {
            "questions": [
                "5ecf7b9a525ab2125c2b9726",
                "5ecf7b9a525ab2125c2b9729"
            ],
            "category": "Exam"
        }
    ```

* Response
    * Status: 200 - OK
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Assessment was updated successfully",
            "results": 1,
            "data": {
                "_id": "5ed116aaaa3e3e21acf51f89",
                "questions": [
                    "5ecf7b9a525ab2125c2b96fc",
                    "5ecf7b9a525ab2125c2b9708",
                    "5ecf7b9a525ab2125c2b970c",
                    "5ecf7b9a525ab2125c2b970e",
                    "5ecf7b9a525ab2125c2b9719",
                    "5ecf7b9a525ab2125c2b971b",
                    "5ecf7b9a525ab2125c2b971e",
                    "5ecf7b9a525ab2125c2b9726",
                    "5ecf7b9a525ab2125c2b9729"
                ],
                "subject": "Chemistry",
                "title": "Quiz",
                "class": "SS1",
                "category": "Exam",
                "term": 1,
                "year": "2020",
                "percentage": 10,
                "school": "5ecb08dfd2595416f0dc9975",
                "createdOn": "2020-05-29T14:05:30.000Z",
                "__v": 0
            }
        }
    ```

### Delete Assessment

* Request:
    * Endpoint: DELETE/api/v1/schools/5ecb08dfd2595416f0dc9975/assessments/5ed116aaaa3e3e21acf51f89
  
* Response:
    * Status: 204 - No Content


### Classes

### Retrieve Classes
* Request
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9977/classes

* Response
    * Status: 200 - OK
    * Body: (application/json)
    ```
        {
           "status": "success",
            "message": "Classes retrieved successfully",
            "results": 2,
            "data": [
                {
                    "_id": "5ed2330cfc427e1f740cfba2",
                    "students": [
                        "5ecf9935dca4071ddc002088",
                        "5ecf9935dca4071ddc002089",
                        "5ecf9935dca4071ddc00208b",
                        "5ecf9935dca4071ddc00208e",
                        "5ecf9935dca4071ddc00208d"
                    ],
                    "title": "SS2C",
                    "formTeacher": "5ecf9935dca4071ddc002089",
                    "prefect": "5ecf9935dca4071ddc002088",
                    "term": 1,
                    "numOfBoys": 14,
                    "numOfGirls": 23,
                    "year": "2020",
                    "population": 37,
                    "school": "5ecb08dfd2595416f0dc9977",
                    "createdOn": "2020-05-30T10:18:52.000Z",
                    "__v": 0
                },
                {
                    "_id": "5ed233aafc427e1f740cfba3",
                    "students": [
                        "5ecf9935dca4071ddc002088",
                        "5ecf9935dca4071ddc002089",
                        "5ecf9935dca4071ddc00208b",
                        "5ecf9935dca4071ddc00208e",
                        "5ecf9935dca4071ddc00208d"
                    ],
                    "title": "Basic1A",
                    "formTeacher": "5ecf9935dca4071ddc002089",
                    "prefect": "5ecf9935dca4071ddc002088",
                    "term": 1,
                    "numOfBoys": 12,
                    "numOfGirls": 23,
                    "year": "2020",
                    "population": 35,
                    "school": "5ecb08dfd2595416f0dc9977",
                    "createdOn": "2020-05-30T10:21:30.000Z",
                    "__v": 0
                }
            ]
        }
    ```    

### Retrieve Class
* Request
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed2330cfc427e1f740cfba2

* Response
    * Status: 200 - OK
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Class retrieved successfully",
            "results": 1,
            "data": {
                "_id": "5ed2330cfc427e1f740cfba2",
                "students": [
                    "5ecf9935dca4071ddc002088",
                    "5ecf9935dca4071ddc002089",
                    "5ecf9935dca4071ddc00208b",
                    "5ecf9935dca4071ddc00208e",
                    "5ecf9935dca4071ddc00208d"
                ],
                "title": "Basic1A",
                "formTeacher": "5ecf9935dca4071ddc002089",
                "prefect": "5ecf9935dca4071ddc002088",
                "term": 1,
                "numOfBoys": 12,
                "numOfGirls": 23,
                "year": "2020",
                "population": 35,
                "school": "5ecb08dfd2595416f0dc9977",
                "createdOn": "2020-05-30T10:18:52.000Z",
                "__v": 0
            }
        }
    ```    

### Create Class
* Request
    * Endpoint: POST/api/v1/schools/5ecb08dfd2595416f0dc9977/classes
    * Body: (application/json)
    ```
        {
            "title":"SS2B",
            "formTeacher":"5ecf9935dca4071ddc002089",
            "prefect":"5ecf9935dca4071ddc002088",
            "term": 1,
            "students": [
              "5ecf9935dca4071ddc002088",
              "5ecf9935dca4071ddc002089",
              "5ecf9935dca4071ddc00208b",
              "5ecf9935dca4071ddc00208e",
              "5ecf9935dca4071ddc00208d"
              ],
            "numOfBoys": 12,
            "numOfGirls": 23,
            "year": "2020",
            "population": 35,
            "school": "5ecb08dfd2595416f0dc997c"
        }
    ```

* Response
    * Status: 201 - Created
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Class created successfully",
            "results": 1,
            "data": {
                "students": [
                    "5ecf9935dca4071ddc002088",
                    "5ecf9935dca4071ddc002089",
                    "5ecf9935dca4071ddc00208b",
                    "5ecf9935dca4071ddc00208e",
                    "5ecf9935dca4071ddc00208d"
                ],
                "_id": "5ed233bafc427e1f740cfba4",
                "title": "SS2B",
                "formTeacher": "5ecf9935dca4071ddc002089",
                "prefect": "5ecf9935dca4071ddc002088",
                "term": 1,
                "numOfBoys": 12,
                "numOfGirls": 23,
                "year": "2020",
                "population": 35,
                "school": "5ecb08dfd2595416f0dc9977",
                "createdOn": "2020-05-30T10:21:46.000Z",
                "__v": 0
            }
        }
    ```    

### Update Class
* Request
    * Endpoint: PATCH/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed2330cfc427e1f740cfba2
    * Body: (application/json)
    ```
       {
	        "students": [
                "5ecf9935dca4071ddc00208c",
                "5ecf9935dca4071ddc00208f"
            ],
            "title": "Basic3A",
            "term": 3
        }
    ```

* Response
    * Status: 200 - OK
    * Body: (application/json)
    ```
        {
            "status": "success",
            "message": "Class was updated successfully",
            "results": 1,
            "data": {
                "_id": "5ed2330cfc427e1f740cfba2",
                "students": [
                    "5ecf9935dca4071ddc002088",
                    "5ecf9935dca4071ddc002089",
                    "5ecf9935dca4071ddc00208b",
                    "5ecf9935dca4071ddc00208e",
                    "5ecf9935dca4071ddc00208d",
                    "5ecf9935dca4071ddc00208c",
                    "5ecf9935dca4071ddc00208f"
                ],
                "title": "Basic3A",
                "formTeacher": "5ecf9935dca4071ddc002089",
                "prefect": "5ecf9935dca4071ddc002088",
                "term": 3,
                "numOfBoys": 12,
                "numOfGirls": 23,
                "year": "2020",
                "population": 35,
                "school": "5ecb08dfd2595416f0dc9977",
                "createdOn": "2020-05-30T10:18:52.000Z",
                "__v": 0
            }
        }
    ```

### Delete Class

* Request:
    * Endpoint: DELETE/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed2330cfc427e1f740cfba2
  
* Response:
    * Status: 204 - No Content

### Study Timetable

### Create Timetable

* Request:
    * Endpoint: POST/api/v1/users/me/study_timetable
    * Body: (application/json)
     ```
     {
        "monday": [
                {"subject": "Math", "numOfStudyHours": "1 hour", "start": "5pm", "stop": "6pm"},
                {"subject": "English", "numOfStudyHours": "1 hour", "start": "7pm", "stop": "8pm"}
            ],
        "tuesday": [
                {"subject": "Physics", "numOfStudyHours": "1 hour", "start": "5pm", "stop": "6pm"},
                {"subject": "Chemistry", "numOfStudyHours": "1 hour", "start": "7pm", "stop": "8pm"}
            ],
        "wednesday": [
                {"subject": "Biology", "numOfStudyHours": "1 hour", "start": "5pm", "stop": "6pm"},
                {"subject": "Agric", "numOfStudyHours": "1 hour", "start": "7pm", "stop": "8pm"}
            ],
        "thursday": [
                {"subject": "CRS", "numOfStudyHours": "1 hour", "start": "5pm", "stop": "6pm"},
                {"subject": "Civic", "numOfStudyHours": "1 hour", "start": "6:30pm", "stop": "7:30pm"}
            ],
        "friday": [
            {"subject": "Further Maths", "numOfStudyHours": "1 hour", "start": "5pm", "stop": "6pm"},
                {"subject": "Government", "numOfStudyHours": "1 hour", "start": "7pm", "stop": "8pm"}
            ],
        "saturday": [
                {"subject": "Literature", "numOfStudyHours": "1 hour", "start": "5pm", "stop": "6pm"},
                {"subject": "English", "numOfStudyHours": "1 hour", "start": "7pm", "stop": "8pm"}
            ],
        "sunday": [
                {"subject": "Math", "numOfStudyHours": "1 hour", "start": "5pm", "stop": "6pm"},
                {"subject": "Chemistry", "numOfStudyHours": "1 hour", "start": "7pm", "stop": "8pm"}
            ]
        }
     ```
* Response
    * Status: 201 - created
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Your timetable has been successfully created",
        "results": 1,
        "data": {
            "authorCategory": "Student",
            "category": "Study",
            "_id": "5ed3b246538ee0184cf8d6fd",
            "monday": [
                {
                    "_id": "5ed3b246538ee0184cf8d6fe",
                    "subject": "Math",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d6ff",
                    "subject": "English",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "tuesday": [
                {
                    "_id": "5ed3b246538ee0184cf8d700",
                    "subject": "Physics",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d701",
                    "subject": "Chemistry",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "wednesday": [
                {
                    "_id": "5ed3b246538ee0184cf8d702",
                    "subject": "Biology",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d703",
                    "subject": "Agric",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "thursday": [
                {
                    "_id": "5ed3b246538ee0184cf8d704",
                    "subject": "CRS",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d705",
                    "subject": "Civic",
                    "numOfStudyHours": "1 hour",
                    "start": "6:30pm",
                    "stop": "7:30pm"
                }
            ],
            "friday": [
                {
                    "_id": "5ed3b246538ee0184cf8d706",
                    "subject": "Further Maths",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d707",
                    "subject": "Government",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "saturday": [
                {
                    "_id": "5ed3b246538ee0184cf8d708",
                    "subject": "Literature",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d709",
                    "subject": "English",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "sunday": [
                {
                    "_id": "5ed3b246538ee0184cf8d70a",
                    "subject": "Math",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d70b",
                    "subject": "Chemistry",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "authorUsername": "lawrenceayantola84",
            "__v": 0
        }
    }
    ```

### Fetch Timetable

* Request:
    * Endpoint: GET/api/v1/users/me/study_timetable

* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Your timetable has been successfully retrieved",
        "results": 1,
        "data": {
            "authorCategory": "Student",
            "category": "Study",
            "_id": "5ed3b246538ee0184cf8d6fd",
            "monday": [
                {
                    "_id": "5ed3b246538ee0184cf8d6fe",
                    "subject": "Math",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d6ff",
                    "subject": "English",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "tuesday": [
                {
                    "_id": "5ed3b246538ee0184cf8d700",
                    "subject": "Physics",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d701",
                    "subject": "Chemistry",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "wednesday": [
                {
                    "_id": "5ed3b246538ee0184cf8d702",
                    "subject": "Biology",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d703",
                    "subject": "Agric",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "thursday": [
                {
                    "_id": "5ed3b246538ee0184cf8d704",
                    "subject": "CRS",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d705",
                    "subject": "Civic",
                    "numOfStudyHours": "1 hour",
                    "start": "6:30pm",
                    "stop": "7:30pm"
                }
            ],
            "friday": [
                {
                    "_id": "5ed3b246538ee0184cf8d706",
                    "subject": "Further Maths",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d707",
                    "subject": "Government",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "saturday": [
                {
                    "_id": "5ed3b246538ee0184cf8d708",
                    "subject": "Literature",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d709",
                    "subject": "English",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "sunday": [
                {
                    "_id": "5ed3b246538ee0184cf8d70a",
                    "subject": "Math",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d70b",
                    "subject": "Chemistry",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "authorUsername": "lawrenceayantola84",
            "__v": 0
        }
    }
    ```

### Update Timetable
* Request: 
    * Endpoint PATCH/api/v1/users/me/study_timetable
    * Body: (application/json)
    ```
    {
        "tuesday": [
                {
                    "_id": "5ed3b246538ee0184cf8d6fe",
                    "subject": "Math",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d6ff",
                    "subject": "English",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "monday": [
                {
                    "_id": "5ed3b246538ee0184cf8d700",
                    "subject": "Physics",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d701",
                    "subject": "Chemistry",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ]
    }
    ```

* Response:
    * Status: 200 - ok 
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Your timetable has been successfully updated",
        "results": 1,
        "data": {
            "authorCategory": "Student",
            "category": "Study",
            "_id": "5ed3b246538ee0184cf8d6fd",
            "monday": [
                {
                    "_id": "5ed3b246538ee0184cf8d700",
                    "subject": "Physics",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d701",
                    "subject": "Chemistry",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "tuesday": [
                {
                    "_id": "5ed3b246538ee0184cf8d6fe",
                    "subject": "Math",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d6ff",
                    "subject": "English",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "wednesday": [
                {
                    "_id": "5ed3b246538ee0184cf8d702",
                    "subject": "Biology",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d703",
                    "subject": "Agric",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "thursday": [
                {
                    "_id": "5ed3b246538ee0184cf8d704",
                    "subject": "CRS",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d705",
                    "subject": "Civic",
                    "numOfStudyHours": "1 hour",
                    "start": "6:30pm",
                    "stop": "7:30pm"
                }
            ],
            "friday": [
                {
                    "_id": "5ed3b246538ee0184cf8d706",
                    "subject": "Further Maths",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d707",
                    "subject": "Government",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "saturday": [
                {
                    "_id": "5ed3b246538ee0184cf8d708",
                    "subject": "Literature",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d709",
                    "subject": "English",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "sunday": [
                {
                    "_id": "5ed3b246538ee0184cf8d70a",
                    "subject": "Math",
                    "numOfStudyHours": "1 hour",
                    "start": "5pm",
                    "stop": "6pm"
                },
                {
                    "_id": "5ed3b246538ee0184cf8d70b",
                    "subject": "Chemistry",
                    "numOfStudyHours": "1 hour",
                    "start": "7pm",
                    "stop": "8pm"
                }
            ],
            "authorUsername": "lawrenceayantola84",
            "__v": 0
        }
    }
    ```
### Delete Timetable

* Request:
    * Endpoint: DELETE/api/v1/users/me/study_timetable
  
* Response:
    * Status: 204 -  no content

### Lecture Timetable

### Create Lecture Timetable
* Request:
    * Endpoint: POST/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/lecture_timetable
    * Body: (application/json)
    ```
        {
        "monday": [
            {"subject": "Biology", "amountOfLectureTime": "2 hours", "start": "8am", "stop": "10am", "tutor": "bukolaayantola18"},
            {"subject": "Basic Technology", "amountOfLectureTime": "2 hours", "start": "11am", "stop": "1pm", "tutor": "bukolaayantola18"}
            ],
        "tuesday": [
            {"subject": "Chemistry", "amountOfLectureTime": "2 hours", "start": "8am", "stop": "10am", "tutor": "godswillafolabi76"},
            {"subject": "Chemistry", "amountOfLectureTime": "2 hours", "start": "11am", "stop": "1pm", "tutor": "godswillafolabi76"}
            ],
        "wednesday": [
            {"subject": "Hausa Language", "amountOfLectureTime": "2 hours", "start": "8am", "stop": "10am", "tutor": "amaraokoli25"},
            {"subject": "Mathematics", "amountOfLectureTime": "2 hours", "start": "11am", "stop": "1pm", "tutor": "amaraokoli25"}
            ],
        "thursday": [
            {"subject": "Physics", "amountOfLectureTime": "2 hours", "start": "8am", "stop": "10am", "tutor": "amakemmuoma15"},
            {"subject": "Physics", "amountOfLectureTime": "2 hours", "start": "11am", "stop": "1pm", "tutor": "amakemmuoma15"}
            ],
        "friday": [
            {"subject": "Accounting", "amountOfLectureTime": "2 hours", "start": "8am", "stop": "10am", "tutor": "bbatundeobasola39"},
            {"subject": "Accounting", "amountOfLectureTime": "2 hours", "start": "11am", "stop": "1pm", "tutor": "bbatundeobasola39"}
        ]
    }
    ```

* Response:
    * Status: 201 - created
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Lecture Timetable Created Successfully",
        "results": 1,
        "data": {
            "category": "Lecture",
            "_id": "5ed503919d420d1d3849a07a",
            "monday": [
                {
                    "_id": "5ed503919d420d1d3849a07b",
                    "subject": "Biology",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "bukolaayantola18"
                },
                {
                    "_id": "5ed503929d420d1d3849a07c",
                    "subject": "Basic Technology",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "bukolaayantola18"
                }
            ],
            "tuesday": [
                {
                    "_id": "5ed503929d420d1d3849a07d",
                    "subject": "Chemistry",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "godswillafolabi76"
                },
                {
                    "_id": "5ed503929d420d1d3849a07e",
                    "subject": "Chemistry",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "godswillafolabi76"
                }
            ],
            "wednesday": [
                {
                    "_id": "5ed503929d420d1d3849a07f",
                    "subject": "Hausa Language",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "amaraokoli25"
                },
                {
                    "_id": "5ed503929d420d1d3849a080",
                    "subject": "Mathematics",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "amaraokoli25"
                }
            ],
            "thursday": [
                {
                    "_id": "5ed503929d420d1d3849a081",
                    "subject": "Physics",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "amakemmuoma15"
                },
                {
                    "_id": "5ed503929d420d1d3849a082",
                    "subject": "Physics",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "amakemmuoma15"
                }
            ],
            "friday": [
                {
                    "_id": "5ed503929d420d1d3849a083",
                    "subject": "Accounting",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "bbatundeobasola39"
                },
                {
                    "_id": "5ed503929d420d1d3849a084",
                    "subject": "Accounting",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "bbatundeobasola39"
                }
            ],
            "school": "5ecb08dfd2595416f0dc9977",
            "class": "5ed503549d420d1d3849a079",
            "form_teacher": "5ed2baf8ca1dbc1d6c0095d8",
            "class_prefect": "5ed2bbf7ca1dbc1d6c00962e",
            "__v": 0
        }
    }
    ```

### Fetch All Timetables
* Request:
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9977/lecture_timetables

* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Successfully retrieved all the lecture timetables for your school",
        "results": 1,
        "data": [
            {
                "category": "Lecture",
                "_id": "5ed503919d420d1d3849a07a",
                "monday": [
                    {
                        "_id": "5ed503919d420d1d3849a07b",
                        "subject": "Biology",
                        "amountOfLectureTime": "2 hours",
                        "start": "8am",
                        "stop": "10am",
                        "tutor": "bukolaayantola18"
                    },
                    {
                        "_id": "5ed503929d420d1d3849a07c",
                        "subject": "Basic Technology",
                        "amountOfLectureTime": "2 hours",
                        "start": "11am",
                        "stop": "1pm",
                        "tutor": "bukolaayantola18"
                    }
                ],
                "tuesday": [
                    {
                        "_id": "5ed503929d420d1d3849a07d",
                        "subject": "Chemistry",
                        "amountOfLectureTime": "2 hours",
                        "start": "8am",
                        "stop": "10am",
                        "tutor": "godswillafolabi76"
                    },
                    {
                        "_id": "5ed503929d420d1d3849a07e",
                        "subject": "Chemistry",
                        "amountOfLectureTime": "2 hours",
                        "start": "11am",
                        "stop": "1pm",
                        "tutor": "godswillafolabi76"
                    }
                ],
                "wednesday": [
                    {
                        "_id": "5ed503929d420d1d3849a07f",
                        "subject": "Hausa Language",
                        "amountOfLectureTime": "2 hours",
                        "start": "8am",
                        "stop": "10am",
                        "tutor": "amaraokoli25"
                    },
                    {
                        "_id": "5ed503929d420d1d3849a080",
                        "subject": "Mathematics",
                        "amountOfLectureTime": "2 hours",
                        "start": "11am",
                        "stop": "1pm",
                        "tutor": "amaraokoli25"
                    }
                ],
                "thursday": [
                    {
                        "_id": "5ed503929d420d1d3849a081",
                        "subject": "Physics",
                        "amountOfLectureTime": "2 hours",
                        "start": "8am",
                        "stop": "10am",
                        "tutor": "amakemmuoma15"
                    },
                    {
                        "_id": "5ed503929d420d1d3849a082",
                        "subject": "Physics",
                        "amountOfLectureTime": "2 hours",
                        "start": "11am",
                        "stop": "1pm",
                        "tutor": "amakemmuoma15"
                    }
                ],
                "friday": [
                    {
                        "_id": "5ed503929d420d1d3849a083",
                        "subject": "Accounting",
                        "amountOfLectureTime": "2 hours",
                        "start": "8am",
                        "stop": "10am",
                        "tutor": "bbatundeobasola39"
                    },
                    {
                        "_id": "5ed503929d420d1d3849a084",
                        "subject": "Accounting",
                        "amountOfLectureTime": "2 hours",
                        "start": "11am",
                        "stop": "1pm",
                        "tutor": "bbatundeobasola39"
                    }
                ],
                "school": "5ecb08dfd2595416f0dc9977",
                "class": "5ed503549d420d1d3849a079",
                "form_teacher": "5ed2baf8ca1dbc1d6c0095d8",
                "class_prefect": "5ed2bbf7ca1dbc1d6c00962e",
                "__v": 0
            }
        ]
    }
    ```

### Fetch Lecture Timetable
* Request:
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/lecture_timetable

* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Successfully retrieved the lecture timetable for this class.",
        "results": 1,
        "data": {
            "category": "Lecture",
            "_id": "5ed503919d420d1d3849a07a",
            "monday": [
                {
                    "_id": "5ed503919d420d1d3849a07b",
                    "subject": "Biology",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "bukolaayantola18"
                },
                {
                    "_id": "5ed503929d420d1d3849a07c",
                    "subject": "Basic Technology",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "bukolaayantola18"
                }
            ],
            "tuesday": [
                {
                    "_id": "5ed503929d420d1d3849a07d",
                    "subject": "Chemistry",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "godswillafolabi76"
                },
                {
                    "_id": "5ed503929d420d1d3849a07e",
                    "subject": "Chemistry",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "godswillafolabi76"
                }
            ],
            "wednesday": [
                {
                    "_id": "5ed503929d420d1d3849a07f",
                    "subject": "Hausa Language",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "amaraokoli25"
                },
                {
                    "_id": "5ed503929d420d1d3849a080",
                    "subject": "Mathematics",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "amaraokoli25"
                }
            ],
            "thursday": [
                {
                    "_id": "5ed503929d420d1d3849a081",
                    "subject": "Physics",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "amakemmuoma15"
                },
                {
                    "_id": "5ed503929d420d1d3849a082",
                    "subject": "Physics",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "amakemmuoma15"
                }
            ],
            "friday": [
                {
                    "_id": "5ed503929d420d1d3849a083",
                    "subject": "Accounting",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "bbatundeobasola39"
                },
                {
                    "_id": "5ed503929d420d1d3849a084",
                    "subject": "Accounting",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "bbatundeobasola39"
                }
            ],
            "school": "5ecb08dfd2595416f0dc9977",
            "class": "5ed503549d420d1d3849a079",
            "form_teacher": "5ed2baf8ca1dbc1d6c0095d8",
            "class_prefect": "5ed2bbf7ca1dbc1d6c00962e",
            "__v": 0
        }
    }
    ```

### Update Lecture Timetable
* Request: 
    * Endpoint: PATCH/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/lecture_timetable
    * Body: (application/json)
    ```
    {
        "tuesday": [
                {
                    "_id": "5ed4118f065a93196873ef92",
                    "subject": "Biology",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "bukolaayantola18"
                },
                {
                    "_id": "5ed4118f065a93196873ef93",
                    "subject": "Basic Technology",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "bukolaayantola18"
                }
            ],
            "monday": [
                {
                    "_id": "5ed4118f065a93196873ef94",
                    "subject": "Chemistry",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "godswillafolabi76"
                },
                {
                    "_id": "5ed4118f065a93196873ef95",
                    "subject": "Chemistry",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "godswillafolabi76"
                }
            ]
    }
    ```
* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Successfully updated the lecture timetable for this class.",
        "results": 1,
        "data": {
            "category": "Lecture",
            "_id": "5ed503919d420d1d3849a07a",
            "monday": [
                {
                    "_id": "5ed4118f065a93196873ef94",
                    "subject": "Chemistry",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "godswillafolabi76"
                },
                {
                    "_id": "5ed4118f065a93196873ef95",
                    "subject": "Chemistry",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "godswillafolabi76"
                }
            ],
            "tuesday": [
                {
                    "_id": "5ed4118f065a93196873ef92",
                    "subject": "Biology",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "bukolaayantola18"
                },
                {
                    "_id": "5ed4118f065a93196873ef93",
                    "subject": "Basic Technology",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "bukolaayantola18"
                }
            ],
            "wednesday": [
                {
                    "_id": "5ed503929d420d1d3849a07f",
                    "subject": "Hausa Language",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "amaraokoli25"
                },
                {
                    "_id": "5ed503929d420d1d3849a080",
                    "subject": "Mathematics",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "amaraokoli25"
                }
            ],
            "thursday": [
                {
                    "_id": "5ed503929d420d1d3849a081",
                    "subject": "Physics",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "amakemmuoma15"
                },
                {
                    "_id": "5ed503929d420d1d3849a082",
                    "subject": "Physics",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "amakemmuoma15"
                }
            ],
            "friday": [
                {
                    "_id": "5ed503929d420d1d3849a083",
                    "subject": "Accounting",
                    "amountOfLectureTime": "2 hours",
                    "start": "8am",
                    "stop": "10am",
                    "tutor": "bbatundeobasola39"
                },
                {
                    "_id": "5ed503929d420d1d3849a084",
                    "subject": "Accounting",
                    "amountOfLectureTime": "2 hours",
                    "start": "11am",
                    "stop": "1pm",
                    "tutor": "bbatundeobasola39"
                }
            ],
            "school": "5ecb08dfd2595416f0dc9977",
            "class": "5ed503549d420d1d3849a079",
            "form_teacher": "5ed2baf8ca1dbc1d6c0095d8",
            "class_prefect": "5ed2bbf7ca1dbc1d6c00962e",
            "__v": 0
        }
    }
    ```
### Delete Lecture Timetable
* Request: 
    * Endpoint: DELETE/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/lecture_timetable

* Response: 
    * Status: 204 - no content