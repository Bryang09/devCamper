const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./config/db");

// LOAD ENV VARS

dotenv.config({ path: "./config/config.env" });

// CONNECT TO DATABASE
connectDB();

// ROUTE FILES
const bootcamps = require("./routes/bootcamps");

const app = express();

// DEV LOGGING MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// MOUNT ROUTERS
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Listening on port ${PORT}`));

// HANDLE UNHANDLED PROMISE REJECTIONS
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //   CLOSE SERVER & EXIT PROCCESS
  server.close(() => process.exit(1));
});
