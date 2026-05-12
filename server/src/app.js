const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/auth", authRoutes);

app.get('/', (req, res) => {
    res.send("Server running");
});

module.exports = app;