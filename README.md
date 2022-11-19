# Angular14 - Cookie Auth

This project was intended to devlop on system with security system
where JWT token is put on cookies for security purposes.

## Backend server

Backend system was developed on Java(Spring boot) with spring security

SpringBoot-CookieAuth - (https://github.com/EliedersonLinhares/SpringBoot-CookieAuth)

## Features

`Use cookies to store JWT token` -> Http-only Cookies are used to avoid putting tokens on localstorage.

`Rememnber-me simple system` -> Using the refresh token endpoints of backend we can put one check box on login page, if marked he is put a true flag on session-storage, and if is true call the backend endpoint with HttpInterceptor on angular.

`Authenticate system` -> For logged-in only user access the system pages .

## Running the application

Run `npm install` to instal node-modules.

Run `ng serve` to run application.

Note: need backend and database already running

## What can implemented in future versions

-Use the role system in frontend

-Make page with data of user profile

-Use form restrictions on login page

## Reference

Tech Seeker - (https://www.learmoreseekmore.com/2022/01/part1-angular-jwt-authentication-using-http-only-cookie.html)
