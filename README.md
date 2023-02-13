<img src="./smartmin_frontend/src/assets/logo2.png" style="display:block; margin:auto;" width="250" alt="Smartmin Logo"></img>
# Internet of Things: Project 10.2 (Smartmin)

## Overview

Smartmin is an Internet of Things application developed as part of the Internet of Things course of Electrical and Computer Engineering Department of University of Patras.<br>
Its purpose is to provide an administrative solution for public buildings, by temperature and humidity monitoring and alerting when these values exceed certain limits, as well as smart devices control. Moreover, the administrator can manage certain devices via the application.

---

## System Architecture

During the application development the following technologies were used:

* MongoDB
* Express.js
* Vue.js (+Vuetify framework)
* Node.js
* Node-RED

### MongoDB

The system's database is a NoSQL MongoDB. This choice was made in order to make the system more scalable and avoid the strict limitations an SQL db defines. The database schema is defined in the model directory of the backend application.

### Node.js and Express.js

The system's backend is based on the combination of Express.js and Node.js, because they provide an easy way to develop a server and a REST API for providing data to the frontend or other applications that need to access data for the public building our solution is installed to.

### Vue.js

Ths system's frontend is a Vue.js application, using the Vuetify styling framework. This technology was used because it is easy to learn and simplifies the app development.

### Node-RED

Node-RED is a useful tool which was used during our application development for emulating the temperature and humidity sensors functionality. Due to supply and time issues, the sensors functionality is emulated from a Node-RED flow in the alpha version as well.

### Communication between the applications

The frontend application communicates with the server via HTTP requests. The admin logs in the system and after that requests data which a non certified user cannot access.<br>
The server connects to the database with the mongoose module and then performs the basic CRUD operations when requested either from the application or the edge devices.
The edge devices communicate with the server via HTTP requests.

---

## Alpha Version

Our solution's alpha version provides a first impression of its capabilities.

### Alerts

Our solution provides alerting, both from the application's panel and by sending an email to the admin with the necessary information concerning this alert.

### Devices

Our solution emulates the opening and closing of edge devices such as lights and locks with emailing the state of the device. This choice was made to demonstrate the application's functionality without real devices, because no device was available due to supply issues. In the future, without many modifications and work, the system should adapt to the use of real edge devices.

### Sensors

Our solution emulates the temperature and humidity sensors functionality with a Node-RED flow, sending a POST request to our server's dedicated endpoints. Then, our application presents the received data using graphs with the given values, as well as some facts (max, min and average values). In the future, without many modifications, the system should adapt to the use of real sensors.

---

## Installation Guide

### Prerequisites

* [Git VCS Tool](https://git-scm.com/downloads "Install Git")
* [Node.js](https://nodejs.org/en/download/ "Download Node.js")
* [Node-RED](https://nodered.org/ "Download Node-RED")
* [University of Patras IP address](https://www.upnet.gr/services/vpn/ "UPatras VPN Instructions")

The installation of the application can be performed by cloning the [Github Repository](https://github.com/sifislaz/smartmin "Smartmin Git Repository") using the following command:<br>
`git clone https://github.com/sifislaz/smartmin.git`<br>
or with [Github Desktop](https://desktop.github.com/ "Github Desktop") application.<br>

### Configuration

#### Frontend Application

Open a terminal in the `/smartmin_frontend` directory and execute the command: `npm i` to install the required modules.

#### Database

Create a MongoDB database following the schema provided under the `/smartmin_backend/model` directory.

#### Backend Application

Open a terminal in the `/smartmin_backend` directory and execute the command: `npm i` to install the required modules.<br>
After that, in the same directory create a `config.env` file which should contain the following information:
```
DB_URI = <The uri provided from mongo db>
ACCESS_TOKEN_SECRET = <A 32 (or more) characters jwt secret>
MAIL_USER = <The gmail account from which the backend will send emails>
MAIL_PASSWORD = <The password of the gmail account>
MAIL_ADMIN = <The admin's email to which the backend will send information>
```
> **Important Note:** About the gmail password, follow these [instructions](https://support.google.com/accounts/answer/185833?hl=en "Google App Password").

> **Important Note:** The `config.env` file must be included in a `.gitignore` file if you use Git

---

## Execute the application

>**Important Note:** The user must have a password 8-16 characters with 1 capital letter, 1 number and 1 character between: !,@,#,$,%,^,&,*.

### Server Application

In order to start the server, open a terminal in the `/smartmin_backend` directory and run the command `npm run dev`. After that, the messages:<br>
"Mongo DB connected"<br>
"Listening on port 3000"<br>
should appear.

### Frontend Application

In order to start the frontend application, open a terminal in the `/smartmin_frontend` directory and run the command `npm run serve`. Wait for the application to build.

### Sensors emulation

In order to start the Node-RED flow that emulates the sensors functionality, open a terminal, run the command `node-red` and then open a web browser and go to `http:localhost:1880`.<br>
Then open the hamburger menu, click "Import" and upload the `flows.json` file from `sensors_emulation` folder and click "Import". After that, click deploy and then click the blue button left to the "timestamp" label.

