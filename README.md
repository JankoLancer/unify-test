# unify-test
# Chat application
This is small chat application built on MEAN stack.
For initialization of project I have used https://github.com/linnovate/mean project.

- Try live demo at https://unify-test.herokuapp.com/

## Features
- Login with unique username
- After login join public chat
- View all messages from all users
- View all active users
- Send new message

# Getting started
### Pre-requisites
- git
- node.js v8.x
- mongodb v3.4.x

### Instalation
Make sure that MongoDB is running on your machine at port 27017 and 4040 port is available to run node.js server.
```
git clone https://github.com/JankoLancer/unify-test.git
cd unify-test
cp .env.example .env
npm install
npm start
```
Visit http://localhost:4200 in your browser to test app.

### Docs
- Interactice Api documentation can be seen on http://localhost:4200/api-docs

### Technologies and Libraries
- [NodeJS](https://nodejs.org/) - JavaScript backend/server-side solution of choice

  - [Joi](https://github.com/hapijs/joi) - Object schema description language and validator for JavaScript objects.

- [Express](https://expressjs.com/) - Node framework that makes handling http requests with ease

  - [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) - package that helps with generating JWTs for secure authentication

  - [PassportJS](http://passportjs.org/) - authentication middleware used to guard certain parts of the app for non-authenticated requests
  
  - [Helmet](https://helmetjs.github.io/) - helmet helps securing Express apps by setting various HTTP headers.

  - [Swagger](https://github.com/scottie1984/swagger-ui-express) - Middleware for express app to serve the Swagger UI bound to Swagger document. 

- [MongoDB](https://www.mongodb.com/) - data storage solution that just speaks JSON and pairs very well with Node

  - [Mongoose](http://mongoosejs.com/) - package that helps with object modeling and manages connection between server and database

- [Socket.io](https://socket.io/) - web sockets implementation, fast and reliable real-time communication engine

- [Angular](https://angular.io/) - rich frontend web framework, helps creating fast, reliable web applications

  - [Angular-CLI](https://cli.angular.io/) - command line interface for streamlined angular development

  - [Material2](https://github.com/angular/material2) - UI components for Angular with Material Design

  - [Flex-layout](https://github.com/angular/flex-layout) - Flexbox CSS for Angular
  

### TODO
- Better UI
- Mock data for testing
- Test docker build