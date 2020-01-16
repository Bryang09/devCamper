const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// ROUTE FILES
const bootcamps = require("./routes/bootcamps");

// LOAD ENV VARS

dotenv.config({ path: "./config/config.env" });

const app = express();

// DEV LOGGING MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// MOUNT ROUTERS
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Listening on port ${PORT}`));
