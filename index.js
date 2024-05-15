const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { dbConnection } = require("./db/config");

dotenv.config();

const app = express();

dbConnection();

//CORS
app.use(cors())

//Security middleware
app.use(helmet());

//Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

//Public directory
app.use(express.static("public"));

//Read and parse body
app.use(express.json());

//Routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/events", require("./routes/events"))

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}...`);
});
