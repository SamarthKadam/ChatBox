<a id="about"> </a>

# ChatBox-Web App🌟

Welcome to Chatbox, your go-to platform for effortless and engaging conversations. Connect with friends, family, and new acquaintances in real-time with our user-friendly interface.Share messages in a secure and vibrant environment.Chatbox fosters seamless communication with its intuitive design and robust features. Stay connected, express yourself, and build meaningful connections with ease.(Desktop Application Comming Soon)

<p  align="center">

<img width="200" src="./backend/public/github/img.png"/>

</p>

- <a href="https://chat-box-samarthkadam.vercel.app/" target="_blank">Demo</a>

- [About Project](#about)

- [Features and Interfaces](#features)

  - [Home](#home)
  - [Login and Authentication](#auth)
  - [Chats](#chats)
  - [Messages](#messages)
  - [Groups](#group)
  - [Search](#search)
  - [Settings](#settings)

- [Tech Stack](#tech-stack)

  - [Front-end](#frontend)
  - [Backend](#backend)
  - [Other Tools](#other)

- [Getting Started Instructions](#instructions)
- [Links](#links)
- [Contact](#contact)

  <a id="features"> </a>

## Features and Interfaces

1. Home Page <a id="home"> </a>

   - [Landing Page](https://chat-box-samarthkadam.vercel.app/) which lists all the features of the app
     <br/><br/>

   <img width="1835" alt="HomePage" src="./backend/public/screenshots/Home.png">
   <br/><br/>
   <img width="1835" alt="Services" src="./backend/public/screenshots/Home2.png"

   <br/><br/>

2. Login/Signup Page (Authentication) <a id="auth"> </a>

   - Fast and secure authentication
   - JWT tokens used to persist the authentication state
   - Enable swift and secure access with Google Sign-In/Login, seamlessly authenticating users using their Google credentials
     <br/><br/>
     <img width="1835" alt="Authentication" src="./backend/public/screenshots/Authentication.png">

   <br/><br/>

3. Chats <a id="chats"> </a>

   - Conversation History: View a comprehensive list of all your past chats, including details about whom you've chatted with and the timestamps of each conversation.

   - One-Click Conversations: Initiate conversations effortlessly by simply clicking on any chat thread from the list, allowing instant connection and seamless interaction.
     <br/><br/>
     <img width="1835" alt="Chats" src="./backend/public/screenshots/Chats.png">

   <br/><br/>

4. Messages <a id="messages"> </a>

   - Effortless Chatting: Easily communicate with others through Socket.IO's seamless functionality.

   - Voice-Based Input: Enjoy hassle-free messaging with voice-based text input capabilities.

   - Typing Indicator: Stay informed with a typing indicator that signals whether the other person is currently typing.

   <img width="1835" alt="Messages" src="./backend/public/screenshots/Messages.png">

<br/><br/> 5. Groups <a id="group"> </a>

- Group Creation: Effortlessly create group chats with the people you need.

- Admin Control: Admin privileges allow for group updates, including changing the group's name or managing user additions and deletions.
  <br/><br/>
  <img width="1835" alt="Group" src="./backend/public/screenshots/Group.png">

<br/><br/> 6. Search <a id="search"> </a>

- Robust Search Functionality: Powerful search feature to easily find people within the application.

- Selection Capability: Select individuals from the search results to initiate conversations seamlessly.

  <img width="1835" alt="Group" src="./backend/public/screenshots/Search.png">

<br/><br/> 7. Settings <a id="settings"> </a>

- Credential Updates: Easily modify your credentials such as email, name like information.

- Profile Picture Upload: Upload your profile picture to personalize your account within the application.

  <img width="1835" alt="Group" src="./backend/public/screenshots/Settings.png">

<br/><br/>
## Demo

  <img width="1835" alt="Group" src="./backend/public/screenshots/Demonstration.gif">

The illustration above showcases a conversation between two separate tabs opened in Chrome, simulating two seperate accounts chatting with each other. It demonstrates the transmission of messages along with the typing effect."

## Tech stack

<a id="frontend"> </a>

#### Frontend

- ReactJS
- Javascript
- Redux
- MaterialUI
- TailWindCSS

<a id="backend"> </a>

#### Backend

- Nodejs
- Express
- MongoDB

<a id="other"> </a>

#### Other Tools

- Socket IO
- NPM Packages

<a id="instructions"> </a>

## Instructions

1. Clone the project:

   - Firstly, clone the project using the command: https://github.com/SamarthKadam/ChatBox

2. Install Packages:

   - Install the required packages by navigating to the backend directory: cd backend and then run npm install.
   - Similarly, move to the frontend directory: cd frontend and execute npm install.

3. To set up the frontend

   - Create a `.env` file in the frontend directory.

   - Add the following values to the `.env` file:
     REACT_APP_API_URL=http://127.0.0.1:4000
     REACT_APP_SOCKET_URL=http://127.0.0.1:4000

4. For configuring the backend:

   - Establish your applications connection with MongoDB using following environment variables as key with your own values.
   - Create a `config.env` file in the backend directory.
   - Set the following environment variables in the `config.env` file:

   - DBPASSWORD=<-yourmongodbpassword-><br>
     DB=<-yourmongodbconnectionuri-><br>
     PORT=4000<br>
     DOMAIN=127.0.0.1<br>
     JWTEXPIRES=90d<br>
     JWTSECRET=<-giveanysecretkey-><br>
     JWT_COOKIE_EXPIRES=90<br>


5. Start Backend Server:

   - Start the backend server using the command: cd backend and then npm start.

6. Start Frontend:

   - Finally, initiate the frontend with the command: cd frontend and then npm start.

7. Open `http://localhost:3000` with your browser to see the app


## Quick-Setup
If you want to eliminate the backend setup then head to .env file in frontend. Replace your values with this
```
REACT_APP_API_URL=https://chatbox-api-bj21.onrender.com
REACT_APP_SOCKET_URL=https://chatbox-api-bj21.onrender.com
```



<a id="links"> </a>

## Useful Links

- [Project Demo](https://chat-box-samarthkadam.vercel.app/)

<a id="contact"> </a>

## Need help?

Feel free to contact me on [Twitter](https://twitter.com/Samarth69908166) or [LinkedIn](https://www.linkedin.com/in/samarth-kadam-119a25209/), know more about me at [samarthkadam.vercel.app](https://samarthkadam.vercel.app/)


[![Twitter](https://img.shields.io/badge/Twitter-follow-blue.svg?logo=twitter&logoColor=white)](https://twitter.com/Samarth69908166)
