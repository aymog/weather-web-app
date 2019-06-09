# Weather Web App

#### A working version of the app has been deployed to heroku and can be accessed using the following link:
### https://react-weather-web-app.herokuapp.com/

Please note that the free version of the AccuWeather API only allows a maximum of 50 API calls per day.

## Database Schema

A database schema describing how the retrieved data for each city should be stored in a relational database has been provided and can be found here: 
#### https://github.com/aymog/weather-web-app/tree/master/database-schema


## To Run Locally

This project has been developed using React.js.  
The node packages manager is needed to compile and run in locally.

#### 1. Download the project files
#### 2. Install all the node packages required by running 'npm install'
#### 3. You can then run the project using any of the three following methods.  
#### a. In the project directory, you can run:

#### `npm start`

This runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

 #### b. For environments using Node, the easiest way to handle this would be to install serve and let it handle the rest.  
  In the project directory, you can run:
 #### `npm install -g serve`
 #### `serve -s build`
 This will serve your site on the local port 5000.  
 Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
  
 #### c. In the project directory, you can run:
  
 #### `npm run build`
  
`npm run build` creates a build directory with a production build of your app. Set up your favorite HTTP server so that a visitor to your site is served index.html, and requests to static paths like /static/js/main.<hash>.js are served with the contents of the /static/js/main.<hash>.js file. For more information see the production build section.  
  
