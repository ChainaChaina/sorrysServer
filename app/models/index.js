const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.models = {}; 
db.sorry = require("./sorryModel.js")(mongoose); 

module.exports = db;