# User_Dashboard_App

## Purpose of the Project

The aim of the project is to develop an application that is flexible and scalable on the server side by utilizing the advantages of microservice architecture,
simple and understandable on the client side, and suitable for the user's purposes. In the developed web application, the user can go through the authentication
and authorization stages of the application and observe the contact data on the dashboard page on the data table, which is already in the database or can be 
changed by adding or removing from the database, and sort the rows ascending or descending according to categories such as first name, last name, email, country
or gender specified in the columns. It can be searched for the relevant word from the search fields on the columns. The statistics of users in categories such as
gender, country, age or job title, which can be selected from the dropdown menu on the Dashboard page, are displayed as graphical tables. Pie chart, line chart 
and basic chart are used. The user can move between the pages with the help of the navigation bar. On the User page, the user can observe all the details of people
in the data table where the person data is displayed and manage CRUD operations through this table. The user can add new contact information, change existing 
contact information or delete any existing contact.

## Languages and Tools Used

The project consists of three parts: client, server and database. ReactJs was used on the client side, NestJs on the server side and Neo4j with NoSql graph database
structure was used for the database. In addition to ReactJs on the client side, Prime React was used as UI library and Prime Flex was used for CSS. NestJs/TypeScript
was used for the server. Neo4j image is run with the help of docker container. Docker and Postman Client are the tools used during development.

## Available Scripts

The client and database parts of the application are run through the docker-compose.yml file. When the server side is run with the npm run start:dev command, the
application stands up as usable. Dockerfile is written for the client and working conditions are specified. In the docker-compose.yml file, the ports on which the
client and database will run are specified. The module written to connect to the database on the server side pulls the necessary environment variables from the .env file.

### `npm install`

It is used to install dependencies in Node.js projects. When you run this command in a directory containing a package.json file, npm installs all the 
dependencies listed in that file. If there is no package.json file, npm will create one for you. It must be run after cloning this project from github, this command 
must be run for client and server in their own home directory.

### `docker-compose up`

It is used to start all services defined in Docker Compose file. Docker Compose reads the docker-compose.yml file in the current directory by default, and then it 
creates and starts all the containers for the services defined within that file. Docker Compose must be installed and configured on your system to use this command.
This command creates images for neo4j and app client and then start running them in a container. Ctrl+C will stop running terminal if in any case it is needed.

### `npm run start:dev`

This command is used to run app server. Before this command run, docker-compose up must be run because app server looks for database and try to connect. If database
is not ready, server terminal will result in failure and gives error. Ctrl+C will stop running terminal if in any case it is needed.

### `docker-compose down`

This command is used to stop and remove the containers created by Docker Compose. When you run docker-compose down, Docker Compose will stop and remove all the 
containers associated with the services defined in the docker-compose.yml file in the current directory by default. Additionally, it will remove any networks created
by docker-compose up. This command is typically used to clean up after using docker-compose up, shutting down the services and freeing up resources on the host system.


[Screencast from 2024-03-04 13-09-32.webm](https://github.com/davutD/user-dashboard-app/assets/124710876/c2a98fcb-e5f5-4611-9049-dc82277b8d04)



