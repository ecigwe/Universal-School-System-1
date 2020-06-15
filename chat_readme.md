# Real-Time Chat 

## Description
This documentation is about the chat features of the universal school system application.

## API Endpoints and Their Functionality For Chat Features

| Endpoint                                                                                                                                                 | Functionality                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| POST/api/v1/schools/5ecb08dfd2595416f0dc9977/chats                                                                                                       | Create a new message in a school's chat forum.           |
| GET/api/v1/schools/5ecb08dfd2595416f0dc9977/chats                                                                                                        | See all chats in a school's chat forum                   |
| GET/api/v1/schools/5ecb08dfd2595416f0dc9977/chats/5ee381872e0f06116c10b4a2                                                                               | See specific chat in a school's chat forum               |
| PATCH/api/v1/schools/5ecb08dfd2595416f0dc9977/chats/5ee381872e0f06116c10b4a2                                                                             | Update specific chat in a school's chat forum            |
| DELETE/api/v1/schools/5ecb08dfd2595416f0dc9977/chats/5ee381872e0f06116c10b4a2                                                                            | Delete specific chat in a school's chat forum            |
| POST/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/chats                                                                      | Create a new message in a classroom's chat forum         |
| GET/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/chats                                                                       | See all the chats in a classroom's chat forum            |
| GET/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/chats/5ee4cb3e668ef404bcf67dff                                              | See specific chat message in a classroom's chat forum    |
| PATCH/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/chats/5ee4cb3e668ef404bcf67dff                                            | Update specific chat message in a classroom's chat forum |
| DELETE/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/chats/5ee4cb3e668ef404bcf67dff                                           | Delete specific chat message in a classroom's chat forum |
| POST/api/v1/schools/5ecb08dfd2595416f0dc9977/groups                                                                                                      | Create a new group within a school                       |
| GET/api/v1/schools/5ecb08dfd2595416f0dc9977/groups                                                                                                       | See all the groups in a school                           |
| GET/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/my_groups                                                                                             | See all the groups you are a member of in a school       |
| GET/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/5ee6c3d22f837f1e2c39c475                                                                              | See the details of a specific group in a school          |
| PATCH/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/5ee6c3d22f837f1e2c39c475                                                                            | Update group name and description                        |
| PATCH/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/5ee6c3d22f837f1e2c39c475/add_new_member                                                             | Add a new member to the group                            |
| DELETE/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/5ee6c3d22f837f1e2c39c475/remove_member?memberUsername=memberusername&memberCategory=membercategory | Remove a member from the group                           |
| DELETE/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/5ee6c3d22f837f1e2c39c475/remove_myself                                                             | Remove yourself from a group                             |
| DELETE/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/5ee6c3d22f837f1e2c39c475/                                                                          | Delete a group                                           |

## Chat Foundations

There are some features that are absolutely neccessary for their corresponding chat feature to be successfully operationalized.

For instance before members of a school and classroom cannot chat when the school itself or classroom does not yet exist.

The school and classroom features are already in place.

However, prior to implementing the chat features, there was currently nothing of that sort for groups, PTA and groups for only two individuals.

This is why they can be found specified below:

* [Groups](#groups)
* [PTA](#pta)
* [DUO](#duo)

## Groups
The ability to form groups is a very essential aspect of the universal school system.

This is because, it allows students and teachers to form study groups, research groups, and other collaborative forums.

Furthermore, the group feature forms the basis of the group chat functionality.

Any person attached to a school can create a group within that school. The group creator, automatically becomes the group's admin. 

Both students and staff can be members of thesame group.

Only the School-Administrator, Principal and Vice-Principal can see all the groups in a school.

Logged in users can see all the groups which they are members of.

In order to see the details of a specific group, you must either be a member of that group or be one of the school's top administrative officers.

In order to update the name and description of a specific group, you must be the group's admin.

Only the group admin can delete a specific group.

Only the group admin can add a new member to a specific group.

Only the group admin can remove a group member from the group.

Logged in users can remove themselves from any group they belong to.

## Sample Requests and Responses For Group API

## Create Group
* Request:
    * Endpoint: POST/api/v1/schools/5ecb08dfd2595416f0dc9977/groups
    * Body:(application/json)
    ```
    {
        "name": "English Research Assignment",
        "description": "This group is for SS2 students who are interested in collaborating with their fellow classmates on their Phonetics English assignment."
    }
    ``` 

* Response:
    * Status: 201 - created
    * Body:(application/json)
    ```
    {
    "status": "success",
    "message": "New Group Created Successfully!",
    "results": 1,
    "data": {
        "_id": "5ee7b1b905d98f1ae03e84bf",
        "name": "English Research Assignment",
        "description": "This group is for SS2 students who are interested in collaborating with their fellow classmates on their Phonetics English assignment.",
        "school": "5ecb08dfd2595416f0dc9977",
        "members": [
            {
                "_id": "5ee7b1b905d98f1ae03e84c0",
                "memberId": "5ed2bbf7ca1dbc1d6c009635",
                "memberUsername": "wasiuedet9",
                "memberCategory": "Student"
            }
        ],
        "createdAt": "2020-06-15T17:36:57.354Z",
        "admin": {
            "id": "5ed2bbf7ca1dbc1d6c009635",
            "username": "wasiuedet9",
            "category": "Student"
        },
        "__v": 0
    }
    ``` 


## Get All Groups
* Request:
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9977/groups 

* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
    {
    "status": "success",
    "message": "Successful",
    "results": 2,
    "data": [
        {
            "admin": {
                "id": "5ed2bbf7ca1dbc1d6c009635",
                "username": "wasiuedet9",
                "category": "Student"
            },
            "_id": "5ee6c3d22f837f1e2c39c475",
            "name": "Chemistry Research Assignment",
            "description": "This group is for SS2 students who are interested in collaborating with their fellow classmates on their Redux reaction Chemistry assignment.",
            "school": "5ecb08dfd2595416f0dc9977",
            "members": [
                {
                    "_id": "5ee6c3d22f837f1e2c39c476",
                    "memberId": "5ed2bbf7ca1dbc1d6c009635",
                    "memberUsername": "wasiuedet9",
                    "memberCategory": "Student"
                }
            ],
            "createdAt": "2020-06-15T00:41:54.136Z",
            "__v": 0
        },
        {
            "admin": {
                "id": "5ed2bbf7ca1dbc1d6c009635",
                "username": "wasiuedet9",
                "category": "Student"
            },
            "_id": "5ee6c42a2f837f1e2c39c477",
            "name": "Biology Research Assignment",
            "description": "This group is for SS2 students who are interested in collaborating with their fellow classmates on their Sense Organs Biology assignment.",
            "school": "5ecb08dfd2595416f0dc9977",
            "members": [
                {
                    "_id": "5ee6c42a2f837f1e2c39c478",
                    "memberId": "5ed2bbf7ca1dbc1d6c009635",
                    "memberUsername": "wasiuedet9",
                    "memberCategory": "Student"
                }
            ],
            "createdAt": "2020-06-15T00:43:22.703Z",
            "__v": 0
        }
    ]
    ``` 

## Get My Groups
* Request:
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/my_groups

* Response:
    * Status: 200 - ok
    * Body:(application/json)
    ```
    {
        "status": "success",
        "message": "Successful",
        "results": 2,
        "data": [
            {
                "admin": {
                    "id": "5ed2bbf7ca1dbc1d6c009635",
                    "username": "wasiuedet9",
                    "category": "Student"
                },
                "_id": "5ee6c3d22f837f1e2c39c475",
                "name": "Biology Research Assignment",
                "description": "This group is for SS2 students who are interested in collaborating with their fellow classmates on their Sense Organs Biology assignment.",
                "school": "5ecb08dfd2595416f0dc9977",
                "members": [
                    {
                        "_id": "5ee6c3d22f837f1e2c39c476",
                        "memberId": "5ed2bbf7ca1dbc1d6c009635",
                        "memberUsername": "wasiuedet9",
                        "memberCategory": "Student"
                    }
                ],
                "createdAt": "2020-06-15T00:41:54.136Z",
                "__v": 0
            },
            {
                "admin": {
                    "id": "5ed2bbf7ca1dbc1d6c009635",
                    "username": "wasiuedet9",
                    "category": "Student"
                },
                "_id": "5ee6c42a2f837f1e2c39c477",
                "name": "Chemistry Research Assignment",
                "description": "This group is for SS2 students who are interested in collaborating with their fellow classmates on their Redux reaction Chemistry assignment.",
                "school": "5ecb08dfd2595416f0dc9977",
                "members": [
                    {
                        "_id": "5ee6c42a2f837f1e2c39c478",
                        "memberId": "5ed2bbf7ca1dbc1d6c009635",
                        "memberUsername": "wasiuedet9",
                        "memberCategory": "Student"
                    }
                ],
                "createdAt": "2020-06-15T00:43:22.703Z",
                "__v": 0
            }
        ]
    }
    ``` 

## Get Specific Group
* Request:
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/5ee6c3d22f837f1e2c39c475 

* Response:
    * Status: 200 - ok
    * Body:(application/json)
    ```
    {
        "status": "success",
        "message": "Successfully Retrieved Group",
        "results": 1,
        "data": {
            "admin": {
                "id": "5ed2bbf7ca1dbc1d6c009635",
                "username": "wasiuedet9",
                "category": "Student"
            },
            "_id": "5ee6c3d22f837f1e2c39c475",
            "name": "Biology Research Assignment",
            "description": "This group is for SS2 students who are interested in collaborating with their fellow classmates on their Sense Organs Biology assignment.",
            "school": "5ecb08dfd2595416f0dc9977",
            "members": [
                {
                    "_id": "5ee6c3d22f837f1e2c39c476",
                    "memberId": "5ed2bbf7ca1dbc1d6c009635",
                    "memberUsername": "wasiuedet9",
                    "memberCategory": "Student"
                }
            ],
            "createdAt": "2020-06-15T00:41:54.136Z",
            "__v": 0
        }
    }
    ``` 

## Update Group Name and Description
* Request:
    * Endpoint: PATCH/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/5ee6c3d22f837f1e2c39c475
    * Body: (application/json)
    ```
    {
        "name": "Mathematics Research Assignment",
        "description": "This group is for SS2 students who are interested in collaborating with their fellow classmates on their Surds Mathematics assignment.",
    }
    ```

* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Successfully Updated Group",
        "results": 1,
        "data": {
            "admin": {
                "id": "5ed2bbf7ca1dbc1d6c009635",
                "username": "wasiuedet9",
                "category": "Student"
            },
            "_id": "5ee6c3d22f837f1e2c39c475",
            "name": "Mathematics Research Assignment",
            "description": "This group is for SS2 students who are interested in collaborating with their fellow classmates on their Surds Mathematics assignment.",
            "school": "5ecb08dfd2595416f0dc9977",
            "members": [
                {
                    "_id": "5ee6c3d22f837f1e2c39c476",
                    "memberId": "5ed2bbf7ca1dbc1d6c009635",
                    "memberUsername": "wasiuedet9",
                    "memberCategory": "Student"
                }
            ],
            "createdAt": "2020-06-15T00:41:54.136Z",
            "__v": 0
        }
    }
    ``` 

## Add New Member to Group
* Request:
    * Endpoint: PATCH/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/5ee6c3d22f837f1e2c39c475/add_new_member
    * Body(application/json)
    ```
    {
        "memberUsername": "musageorge72",
        "memberCategory": "Student"
    }
    ``` 

* Response:
    * Status: 200 - ok
    * Body(application/json)
    ```
    {
        "status": "success",
        "message": "Successfully Updated Group",
        "results": 1,
        "data": {
            "admin": {
                "id": "5ed2bbf7ca1dbc1d6c009635",
                "username": "wasiuedet9",
                "category": "Student"
            },
            "_id": "5ee6c3d22f837f1e2c39c475",
            "name": "Mathematics Research Assignment",
            "description": "This group is for SS2 students who are interested in collaborating with their fellow classmates on their Surds Mathematics assignment.",
            "school": "5ecb08dfd2595416f0dc9977",
            "members": [
                {
                    "_id": "5ee6c3d22f837f1e2c39c476",
                    "memberId": "5ed2bbf7ca1dbc1d6c009635",
                    "memberUsername": "wasiuedet9",
                    "memberCategory": "Student"
                },
                {
                    "_id": "5ee6e1236923fa1daceae87f",
                    "memberId": "5ed2bbf7ca1dbc1d6c009636",
                    "memberUsername": "musageorge72",
                    "memberCategory": "Student"
                }
            ],
            "createdAt": "2020-06-15T00:41:54.136Z",
            "__v": 1
        }
    }
    ``` 

## Delete Member From Group
* Request:
    * Endpoint: DELETE/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/5ee6c3d22f837f1e2c39c475/remove_member?memberUsername=musageorge72&memberCategory=Student

* Response:
    * Status: 200 - ok
    * Body:(application/json)
    ```
    {
        "status": "success",
        "message": "Member Removed Successfully",
        "results": 1,
        "data": {
            "admin": {
                "id": "5ed2bbf7ca1dbc1d6c009635",
                "username": "wasiuedet9",
                "category": "Student"
            },
            "_id": "5ee6c3d22f837f1e2c39c475",
            "name": "Mathematics Research Assignment",
            "description": "This group is for SS2 students who are interested in collaborating with their fellow classmates on their Surds Mathematics assignment.",
            "school": "5ecb08dfd2595416f0dc9977",
            "members": [
                {
                    "_id": "5ee6c3d22f837f1e2c39c476",
                    "memberId": "5ed2bbf7ca1dbc1d6c009635",
                    "memberUsername": "wasiuedet9",
                    "memberCategory": "Student"
                }
            ],
            "createdAt": "2020-06-15T00:41:54.136Z",
            "__v": 2
        }
    }
    ``` 

## Remove Myself From Group
* Request:
    * Endpoint: DELETE/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/5ee6c3d22f837f1e2c39c475/remove_myself

* Response:
    * Status: 200 - ok
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "You are no longer a member of this group.",
        "results": null,
        "data": null
    }
    ``` 

## Delete Group
* Request:
    * Endpoint: DELETE/api/v1/schools/5ecb08dfd2595416f0dc9977/groups/5ee6c3d22f837f1e2c39c475/

* Response:
    * Status: 204 - no content

## Chat Features

There are five main categories of chatting within the application:

* [General School Chat Forum](#general-school-chat-forum)
* [Classroom Chat Forum](#classroom-chat-forum)
* [Group Chat](#group-chat)
* [PTA Chat Forum](#pta-chat-forum)
* [One on One Chat](#one-on-one-chat)

## General School Chat Forum
Each school has it's own chat forum, mainly for the purpose of allowing the school management to reach everyone connected to the school in one place.

Anyone can be a member of this forum, provided you are connected to the school, either as a staff, or as a student or finally, as a parent.

Only members of a school forum, can see the school forum's conversations.

When a message is sent to the school forum, the message is saved to the database for backup purposes.

The messages of a school forum can be retrieved, updated and destroyed.

Only the creator of a message in the school forum and the school management (School-Administrator, Principal and Vice-Principal) have the right to update and delete the message.

Only logged in individuals who are connected to the school can send messages to that school forum.

## Web Socket Events Workflow For General School Chat Forum
* A socket connection is established, once a user is on a views(User Interface) meant for chatting.
  
* The client needs to emit a **joinSchool** event, along with the user's details which should contain his or her username and school (unique schoolId).
* The data being sent from client to server needs to look like this: {username: "myUsername": school: "5ecb08dfd2595416f0dc9977"} 
* Immediately, the user is added to the school forum.
  
* Next, a **message** event, is emitted from the server to the client in order to display a welcome message to the user who just joined the forum.
* The data being sent looks like this: {username: "Universal School System", text: "welcome", time: "7:15 PM"}
 
* Following this, another **message** event is emitted from the server to all the clients in the forum in order to display a message to everyone except the new client that the user has just joined the chat.
* The data being sent looks like this: {username: "Universal School System", text: "myUsername has joined the chat", time: "7:15 PM"}

* Then, a **schoolUsers** event is emitted from the server to the client, sending along the school id and the usernames of all the people who are in the school forum. The purpose of this is to display this information on the user interface.
* The data being sent looks like this: {school: "5ecb08dfd2595416f0dc9977", users: ["myUsername", "anotherUsername", "stillAnotherUsername"]}

* When a user sends a message to the forum, the **chatMessage** event is emitted from the client to the server, along with a message variable.
* The message variable contains data like this: "There will be a mid-term break starting from Friday this week, till Tuesday next week".

* Then a **message** event is again emitted from the server to the client, in order to display the message to everyone in the forum.
* The data being sent looks like this: {username: "bukolaayantola18", text: "There will be a mid-term break starting from Friday this week, till Tuesday next week", time: "8:20 AM"}

* When a user leaves the forum, a **disconnect** event is received on the server.
 
* Then a **message** event is emitted from the server to the client in order to alert everyone that the user has left the chat.
* The data being sent looks like this: {username: "Universal School System", text: "myUsername has left the chat", time: "9:40 PM"}

* Finally a **schoolUsers** event is emitted from the server to the client in order to refresh and update the list of people who are currently chatting in the forum.
* The data being sent looks like this: {school: "5ecb08dfd2595416f0dc9977", users: ["anotherUsername", "stillAnotherUsername"]} 


## CRUD Operations: Sample API Requests and Responses For General School Chat

## Create Message:

* Request
    * Endpoint: POST/api/v1/school/5ecb08dfd2595416f0dc9977/chats
    * Body(application/json)
    ```
    {
        "text": "I officially welcome you all to a new term. Hope you're all ready for a new round of academic activities? This term holds great promise for all of us."
    }
    ``` 

* Response
    * Status: 201 - created
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Message Saved!",
        "results": 1,
        "data": {
            "_id": "5ee381872e0f06116c10b4a2",
            "text": "I officially welcome you all to a new term. Hope you're all ready for a new round of academic activities? This term holds great promise for all of us.",
            "username": "bukolaayantola18",
            "time": "2020-06-12T13:22:15.314Z",
            "school": "5ecb08dfd2595416f0dc9977",
            "userCategory": "Staff",
            "userRole": "Principal",
            "userId": "5ed2baf8ca1dbc1d6c0095d4",
            "__v": 0
        }
    }
    ``` 

## Retrieve Messages

* Request:
    * Endpoint: GET/api/v1/school/5ecb08dfd2595416f0dc9977/chats 

* Response:
    * Status: 200 - ok
    * Body(application/json)
    ```
    {
        "status": "success",
        "message": "Messages Retrieved Successfully!",
        "results": 3,
        "data": [
            {
                "_id": "5ee381872e0f06116c10b4a2",
                "text": "I officially welcome you all to a new term. Hope you're all ready for a new round of academic activities? This term holds great promise for all of us.",
                "username": "bukolaayantola18",
                "time": "2020-06-12T13:22:15.314Z",
                "school": "5ecb08dfd2595416f0dc9977",
                "userCategory": "Staff",
                "userRole": "Principal",
                "userId": "5ed2baf8ca1dbc1d6c0095d4",
                "__v": 0
            },
            {
                "_id": "5ee39a9c2e0f06116c10b4a3",
                "text": "I am fully pumped up for a new school session.",
                "username": "amandababatunde68",
                "time": "2020-06-12T15:09:16.583Z",
                "school": "5ecb08dfd2595416f0dc9977",
                "userCategory": "Student",
                "userRole": "Student",
                "userId": "5ed2bbf7ca1dbc1d6c00962e",
                "__v": 0
            },
            {
                "_id": "5ee39bb72e0f06116c10b4a4",
                "text": "I am grateful to the school staff for taking good care of my children throughout the last school session.",
                "username": "chinyerebabatunde",
                "time": "2020-06-12T15:13:59.323Z",
                "school": "5ecb08dfd2595416f0dc9977",
                "userCategory": "Parent",
                "userRole": "Parent",
                "userId": "5ecb08e3d2595416f0dc997e",
                "__v": 0
            }
        ]
    }
    ```

## Retrieve Message

* Request:
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9977/chats/5ee381872e0f06116c10b4a2

* Response
    * Status: 200 - ok
    * Body(application/json)
    ```
    {
        "status": "success",
        "message": "Message Retrieved Successfully",
        "results": 1,
        "data": {
            "_id": "5ee381872e0f06116c10b4a2",
            "text": "I officially welcome you all to a new term. Hope you're all ready for a new round of academic activities? This term holds great promise for all of us.",
            "username": "bukolaayantola18",
            "time": "2020-06-12T13:22:15.314Z",
            "school": "5ecb08dfd2595416f0dc9977",
            "userCategory": "Staff",
            "userRole": "Principal",
            "userId": "5ed2baf8ca1dbc1d6c0095d4",
            "__v": 0
        }
    }
    ``` 

## Update Message

* Request
    * Endpoint: PATCH/api/v1/schools/5ecb08dfd2595416f0dc9977/chats/5ee381872e0f06116c10b4a2
    * Body(application/json)
    ```
    {
        "text": "I welcome you all to a new session."
    }
    ``` 

* Response
    * Status: 200 - ok
    * Body(application/json)
    ```
    {
        "status": "success",
        "message": "Message Updated Successfully",
        "results": 1,
        "data": {
            "_id": "5ee381872e0f06116c10b4a2",
            "text": "I welcome you all to a new session.",
            "username": "bukolaayantola18",
            "time": "2020-06-12T13:22:15.314Z",
            "school": "5ecb08dfd2595416f0dc9977",
            "userCategory": "Staff",
            "userRole": "Principal",
            "userId": "5ed2baf8ca1dbc1d6c0095d4",
            "__v": 0
        }
    }
    ```

## Delete Message

* Request
    * Endpoint: DELETE/api/v1/schools/5ecb08dfd2595416f0dc9977/chats/5ee381872e0f06116c10b4a2

* Response
    * Status: 204 - no content


## Classroom Chat Forum
Each classroom in a school has it's own chat forum, mainly for the purpose of connecting the classroom teachers and students.

Only students and teachers of the classroom can be a member of the classroom's chat forum.

Only members of the classroom forum, can see the classroom's conversations.

When a message is sent to the classroom forum, the message is saved to the database for backup purposes.

The messages of a classroom forum can be retrieved, updated and destroyed.

Only the creator of a message in the classroom forum, the class Form-Teacher and the school management (School-Administrator, Principal and Vice-Principal) have the right to update and delete the message.

Only logged in individuals who are connected to the classroom can send messages to that class forum.

## Web Socket Events Workflow For General School Chat Forum
* A socket connection is established, once a user is on a views(User Interface) meant for chatting.
  
* The client needs to emit a **joinClassroom** event, along with the user's details which should contain his or her username and classroom (unique classId).
* The data being sent from client to server needs to look like this: {username: "myUsername": classroom: "5ed503549d420d1d3849a079"} 
* Immediately, the user is added to the classroom forum.
  
* Next, a **message** event, is emitted from the server to the client in order to display a welcome message to the user who just joined the forum.
* The data being sent looks like this: {username: "Universal School System", text: "welcome", time: "5:05 PM"}
 
* Following this, another **message** event is emitted from the server to all the clients in the forum in order to display a message to everyone except the new client that the user has just joined the chat.
* The data being sent looks like this: {username: "Universal School System", text: "myUsername has joined the chat", time: "7:15 PM"}

* Then, a **classroomStudents** event is emitted from the server to the client, sending along the classroom id and the usernames of all the people who are in the classroom forum. The purpose of this is to display this information on the user interface.
* The data being sent looks like this: {classroom: "5ed503549d420d1d3849a079", students: ["myUsername", "anotherUsername", "stillAnotherUsername"]}

* When a user sends a message to the forum, the **chatMessage** event is emitted from the client to the server, along with a message variable.
* The message variable contains data like this: "Hey everyone. I have uploaded a lecture resource for you all. Please ensure to master the material and give me feedback if you have any.".

* Then a **message** event is again emitted from the server to the client, in order to display the message to everyone in the forum.
* The data being sent looks like this: {username: "bukolaayantola18", text: "Hey everyone. I have uploaded a lecture resource for you all. Please ensure to master the material and give me feedback if you have any.", time: "8:20 AM"}

* When a user leaves the forum, a **disconnect** event is received on the server.
 
* Then a **message** event is emitted from the server to the client in order to alert everyone that the user has left the chat.
* The data being sent looks like this: {username: "Universal School System", text: "myUsername has left the chat", time: "9:40 PM"}

* Finally a **classroomStudents** event is emitted from the server to the client in order to refresh and update the list of people who are currently chatting in the forum.
* The data being sent looks like this: {classroom: "5ed503549d420d1d3849a079", students: ["anotherUsername", "stillAnotherUsername"]} 


## CRUD Operations: Sample API Requests and Responses For Classroom Forum Chats

## Create Message:

* Request
    * Endpoint: POST/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/chats
    * Body(application/json)
    ```
    {
        "text": "Hey everyone. I have uploaded a lecture resource for you all. Please ensure to master the material and give me feedback if you have any."
    }
    ``` 

* Response
    * Status: 201 - created
    * Body: (application/json)
    ```
    {
        "status": "success",
        "message": "Message Saved!",
        "results": 1,
        "data": {
            "_id": "5ee4c2469d276c1638e4720b",
            "text": "Hey everyone. I have uploaded a lecture resource for you all. Please ensure to master the material and give me feedback if you have any.",
            "username": "godswillafolabi76",
            "time": "2020-06-13T12:10:46.850Z",
            "school": "5ecb08dfd2595416f0dc9977",
            "userCategory": "Staff",
            "userRole": "Vice-Principal",
            "userId": "5ed2baf8ca1dbc1d6c0095d5",
            "classId": "5ed503549d420d1d3849a079",
            "__v": 0
        }
    }
    ``` 

## Retrieve Messages

* Request:
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/chats

* Response:
    * Status: 200 - ok
    * Body(application/json)
    ```
    {
        "status": "success",
        "message": "Messages Retrieved Successfully!",
        "results": 2,
        "data": [
            {
                "_id": "5ee4cb3e668ef404bcf67dff",
                "text": "Hey everyone. I have uploaded a lecture resource for you all. Please ensure to master the material and give me feedback if you have any.",
                "username": "godswillafolabi76",
                "time": "2020-06-13T12:49:02.174Z",
                "school": "5ecb08dfd2595416f0dc9977",
                "userCategory": "Staff",
                "userRole": "Vice-Principal",
                "userId": "5ed2baf8ca1dbc1d6c0095d5",
                "classId": "5ed503549d420d1d3849a079",
                "__v": 0
            },
            {
                "_id": "5ee4cb73668ef404bcf67e00",
                "text": "I just finished mastering the latest lecture resource on advanced trigonometry. It was an enlightening study.",
                "username": "wasiuedet9",
                "time": "2020-06-13T12:49:55.238Z",
                "school": "5ecb08dfd2595416f0dc9977",
                "userCategory": "Student",
                "userRole": "Student",
                "userId": "5ed2bbf7ca1dbc1d6c009635",
                "classId": "5ed503549d420d1d3849a079",
                "__v": 0
            }
        ]
    }
    ```

## Retrieve Message

* Request:
    * Endpoint: GET/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/chats/5ee4cb3e668ef404bcf67dff

* Response
    * Status: 200 - ok
    * Body(application/json)
    ```
    {
        "status": "success",
        "message": "Message Retrieved Successfully",
        "results": 1,
        "data": {
            "_id": "5ee4cb3e668ef404bcf67dff",
            "text": "Hey everyone. I have uploaded a lecture resource for you all. Please ensure to master the material and give me feedback if you have any.",
            "username": "godswillafolabi76",
            "time": "2020-06-13T12:49:02.174Z",
            "school": "5ecb08dfd2595416f0dc9977",
            "userCategory": "Staff",
            "userRole": "Vice-Principal",
            "userId": "5ed2baf8ca1dbc1d6c0095d5",
            "classId": "5ed503549d420d1d3849a079",
            "__v": 0
        }
    }
    ``` 

## Update Message

* Request
    * Endpoint: PATCH/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/chats/5ee4cb3e668ef404bcf67dff
    * Body(application/json)
    ```
    {
        "text": "Hey everyone. I have uploaded a lecture resource for you all. Please ensure to master the material and give me feedback if you have any. There will be a test on this lecture on Wednesday."
    }
    ``` 

* Response
    * Status: 200 - ok
    * Body(application/json)
    ```
    {
    "status": "success",
    "message": "Message Updated Successfully",
    "results": 1,
    "data": {
        "_id": "5ee4cb3e668ef404bcf67dff",
        "text": "Hey everyone. I have uploaded a lecture resource for you all. Please ensure to master the material and give me feedback if you have any. There will be a test on this lecture on Wednesday.",
        "username": "godswillafolabi76",
        "time": "2020-06-13T12:49:02.174Z",
        "school": "5ecb08dfd2595416f0dc9977",
        "userCategory": "Staff",
        "userRole": "Vice-Principal",
        "userId": "5ed2baf8ca1dbc1d6c0095d5",
        "classId": "5ed503549d420d1d3849a079",
        "__v": 0
    }
}
    ```

## Delete Message

* Request
    * Endpoint: DELETE/api/v1/schools/5ecb08dfd2595416f0dc9977/classes/5ed503549d420d1d3849a079/chats/5ee4cb3e668ef404bcf67dff

* Response
    * Status: 204 - no content