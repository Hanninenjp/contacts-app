# contacts-app

- Client: Angular 4 Web Application
- Server: ASP.NET Core Web API
- Cordova: Android Application

## Pre-requisites

##### Client
```
Angular CLI: Installed (npm install -g @angular/cli)
Node.js: Installed (https://nodejs.org)
Run npm install
```

##### Cordova
```
Cordova CLI: Installed (npm install -g cordova)
```

##### Server
```
Visual Studio 2017: Installed
```

## Run

##### Client
```
Run Web API enabled client:
ng serve

Run Local Storage enabled client:
ng serve --environment=local
```

##### Cordova
```
Build client and restore Android platform:
Run build-android.bat (Windows Batch-file)

Run on Android device:
cordova run android
```

##### Server
```
Open solution and run server
```

## Tests

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
