# Real-Time Chat 

## Description
This documentation is about the chat features of the universal school system application.

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