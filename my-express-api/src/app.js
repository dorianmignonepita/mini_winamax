const express = require('express');

const app = express();
const router = require("./routes/playerRoutes");
const router2 = require("./routes/matcheRoutes");

app.use(express.json()); // Middleware for JSON request parsing

app.use("/players", router);
app.use("/matches", router2);

module.exports = app;