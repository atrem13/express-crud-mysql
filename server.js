const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

global.__basedir = __dirname;

const app = express();
var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse request of json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// define sequilize model
const db = require('./app/models');
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({message: "hello world"})
});
require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/image.routes.js")(app);

// set port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.`);
});
