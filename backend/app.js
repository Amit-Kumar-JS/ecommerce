const cookieParser = require("cookie-parser");
const express = require("express")
const errorMiddleware = require('./middlewares/error')
const app = express();

app.use(express.json())
app.use(cookieParser())

// Route imports
const product = require("./routes/productroute")
const user = require("./routes/userRoutes")

app.use("/api/v1",product);
app.use("/user",user);

// error middleware

app.use(errorMiddleware);

module.exports = app