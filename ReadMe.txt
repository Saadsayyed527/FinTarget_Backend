* Project Name: Task Processing System with Rate Limiting
This project is a task-processing system built using Node.js and Express. The primary focus is to handle asynchronous task requests while enforcing rate limits for each user. The tasks are logged in a file, and the system ensures that users are not overloading the server with requests.

 * I have also used reddis before but for using it as a rate limmiter i have previously used the queue in which if in a minute more than 20 logs are hitting the server they will go under processing.And for understanding the assisiment and solving i also took the help of ai tool and after understanding made the project 

* setup and installation 
npm intall 
node index.js

* for testing api 
 on this route  = /api/v1/task
 req.body = {
  "userId": "user123"
}

* files 

1  controllers/taskController.js
logic for Handles incoming task creation requests, queues tasks, and ensures they are processed in order.
Logs completed tasks into task_logs.txt.

2  middleware/rateLimit.js
The rate limit is set to 1 task per second and 20 tasks per minute.

3 routes/taskRoutes.js
/api/v1/task : Handles task creation requests

4 index.js
The main entry point of the application that initializes the Express server, imports routes, and starts the server.

5 config/default.js
Configuration file for defining global constants such as rate limits and time intervals.

* Library Used 
 express , reddis