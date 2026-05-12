const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const app = express();
const authRoutes = require("./routes/authRoutes");
require("./config/passport");

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

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