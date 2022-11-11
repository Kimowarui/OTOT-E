import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
let app = express();
import {cache} from './src/controller.js';

import {router} from "./src/api-routes.js";
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/redis-demo', { useNewUrlParser: true});
var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

var port = process.env.PORT || 8000;

app.use('/', router);
app.get("./players", cache);
app.listen(port, function () {
    console.log("Running RedisDemo on port " + port);
});

export {
    app
};