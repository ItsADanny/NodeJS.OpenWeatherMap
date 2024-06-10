//Application prerequisite
//-----------------------------------------------------------------------

//Import required Node.js packages
const express = require("express");
const cron = require("node-cron");
const https = require("https");

//Import custom Node functions
const db = require("./database");

//Import the .env variables
require('dotenv').config();

//Define the application
const app = express();

//Application function schedules
//-----------------------------------------------------------------------

//Cron tab timing cheatsheet
//
//             ┌──────────── minute (0 - 59)
//             │ ┌────────── hour (0 - 23)
//             │ │ ┌──────── day of the month (1 - 31)
//             │ │ │ ┌────── month (1 - 12)
//             │ │ │ │ ┌──── day of the week (0 - 6) (0 and 7 both represent Sunday)
//             │ │ │ │ │
//             │ │ │ │ │
//             * * * * *
cron.schedule("* * * * *", function() {
    console.log("-----------------------------------------");
    console.log("AUTOMATIC - Preforming tasks - 5 Minutes");
    console.log("-----------------------------------------");
    console.log("Task - Get current weather data - STARTED")
    request_current_weather()
    console.log("-----------------------------------------");
});

//Application debug endpoints
//-----------------------------------------------------------------------
const enable_debug_endpoints = true

if (enable_debug_endpoints) {
    app.post("/debug/retrieve/weather/current", async (req, res) => {
        const body_data = req.body;

        if (body_data) {
            // This will search the database if it can find the already stored geolocation data (long/lat)
            const geo = db.search_geo_for_loc(location)

            // Check if we have the location. If we have this in our database then we will get a True in the geo[0]
            if (geo[0]) {
                //Retrieve the latitude and longitude from our geo variable
                const lat = geo[1][0];
                const lon = geo[1][1];
                //Retrieve the OpenWeatherMap API key from our .env file
                const apikey = process.env.WEATHERKEY;
                //Create the URL
                const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
                //Make the request
                const data = webrequest("get", url);
                if (data[0]) {

                }
            } else {
                res.send("Geo location has not been added yet, Please add the geo location first");
            }
        } else {
            res.send({"success" :false, "message":""});
        }
    });
}

//Application data request endpoints
//-----------------------------------------------------------------------

//This endpoint is to check if the Node is online
app.get("/isalive", async (req, res) => {
    res.send("Node online");
});

//Weather endpoints
//===================================

//This function is to request stored current weather data.
//This data will be refreshed every 5 minutes
app.post("/weather/current", async (req, res) => {
    res.send("");
});

app.post("/weather/add/location", async (req, res) => {
    res.send("");
});

//Geolocation endpoints
app.post("/geo/add", async (req, res) => {
    const body_data = req.body

    if (body_data) {
        res.send("I have a body")
    } else {
        res.send("I don't have a body")
    }
});


//Application functions
//-----------------------------------------------------------------------

function request_current_weather(location="DEFAULT") {

}

function request_forcast() {

}

function webrequest(request_type, url, header=null, body=null)  {
    let success = false
    let data = ""
    switch (request_type) {
        case ("post"):
            data = webrequest_post(url, header, body);
            break;
        case ("get"):
            data = webrequest_get(url, header);
            break;
        default:
            break;

    }

    return [success, data]
}

function webrequest_post(url, header, body) {

}

function webrequest_get(url, header) {

}

//Application Bootup procedure
//-----------------------------------------------------------------------
https.createServer(app).listen(process.env.APPLICATION_PORT, function () {
    console.log('Application bootup succes!, listening at port: ' + process.env.APPLICATION_PORT);
});