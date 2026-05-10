const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.get('/', (req, res) => {
    res.send("Server running");
});

module.exports = app;