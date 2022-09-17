# Gordian
An issue tracker to cut through the madness.

A personal project I developed to both synthesise and showcase the full-stack knowledge I have acquired over the last year and a half. It is an issue tracker with complete CRUD implementation and user authentication, built with Java Springboot on the backend, and Javascript React in the frontend (using a template called Black Dashboard React as a base for the visual style)

## Complete CRUD operations
Create, read, update and delete issues with a responsive, intuitive user interface. Issues have 4 possible states that represent their life cycles: backlog, in progress, testing (QA) and resolved.
![Crud](gifs/CRUD.gif)

## Authentication and user page
Using the Auth0 library, the app supports user authentication and individual, editable profiles. Please note that in the demonstration below, part of the login process was edited out to protect my credentials.
![Authentication](gifs/auth.gif)

## Technical details
The backend was coded using Java with Bootspring and maven. It connects to a simple dockerized mongo database, which isn't part of this repo. The frontend uses Black Dashboard React as a template for the CSS; the functionality I coded using javascript and React. Normally I would use typescript instead, but decided to try out plain javascript for variety. Similarly, I decided to follow an MVC design pattern because I'm most familiar with the DTO pattern.

## Future improvements and features
This initial version didn't incorporate Auth0 to the backend, and therefore lacks functionality that requires more security, such as better handling of user roles. A few features that relate to this are: a proper administration page, assigning issues to specific users and in-app user-role modification.
Should the amount of information contained within an issue grow, a details page for each specific one might be necessary.
A notification system.
A way to group several related issues together.
