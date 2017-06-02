@echo off

echo ### Building Angular 4 app with Angular CLI ###
cd ../contacts-app-client
call ng build --environment=local --output-path=../contacts-app-cordova/www --base-href .
echo ### Angular 4 app built and copied to ./www ###
cd ../contacts-app-cordova

echo ### Removing current Android platform ###
call cordova platform remove android

echo ### Creating new Android platform ###
call cordova platform add android@6.2.1

echo ### Android platform is ready ###
echo ### Run 'cordova run android' command to run the app on a device ###

pause
