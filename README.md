# Smart Attendance System

## Problem statement
These days, in online classes, it is very difficult for teachers to monitor the attendance of students and analyse their performance in classes. There is no proper mechanism to detect whether the student is actually paying attention or not. Also, facial authentication adds an extra layer of security for the online mode of classes. This problem has been in existence for the last couple of years and there is no real solution to it

## Solution

I ideated a lot during the first couple of weeks to find out a solution for the same, then I came up with the idea of building a smart attendance system where the students will be able to mark their attendance by just scanning their face and adding few details just like in other websites. As mentioned above, facial recognition adds an extra layer of security. While registering, the student is required to scan his face, while logging in he has to scan his face and this face is compared to the face in the dataabse, if they match then he is authenticated. 

While attending classes, the student's video can be continuously monitored and based on these points certain metrics can be measured such as attention span, monthly performance, weekly performance, etc. By this, teachers will be able to analyse the ones who are really attending classes. 


### Instructions to run this project

```bash
 git clone https://github.com/sahas-01/smartattendance
```

Go to the project directory

```bash
 cd smartattendance
```

Install dependencies

```bash
 npm install
```

Start the server

```bash
 npm start
```

Additionally, to run this project, you will need to add the following environment variables to your .env file

`REACT_APP_BACKEND_URL=<your url>`

## Tech Stack

**Client:** React, MaterialUI, TailwindCSS, face-api.js

**Server:** Node, Express, MongodB
