const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const sanitize = require("express-mongo-sanitize");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// LOAD ENV VARS

dotenv.config({ path: "./config/config.env" });

// CONNECT TO DATABASE
connectDB();

// ROUTE FILES
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const app = express();

// BODY PARSER
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// DEV LOGGING MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// FILE UPLOAD
app.use(fileupload());

// Sanitize Data
app.use(sanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 100
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable Cors
app.use(cors());

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

// MOUNT ROUTERS
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.cyan.bold
  )
);

// HANDLE UNHANDLED PROMISE REJECTIONS
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //   CLOSE SERVER & EXIT PROCCESS
  server.close(() => process.exit(1));
});
