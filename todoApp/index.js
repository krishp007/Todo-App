const express = require('express');
const userRoute = require("./routes/user.js");
const taskRoute = require("./routes/task.js");
const connectDB = require('./data/database.js');
const cookieParser = require('cookie-parser');
const { errorMiddleware } = require('./middlewares/error.js');
const cors = require("cors");

const app = express();
const port = 8000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials:true,
}))

// routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/tasks", taskRoute);


connectDB();

app.get("/", (req,res)=>{
    res.send("Nice");
});

app.listen(port, ()=>{
    console.log("Server started on port",port);
});

// using error middleware
app.use(errorMiddleware);