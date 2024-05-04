const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const { dbConnection } = require("./db/config");
dotenv.config();

const app = express();

dbConnection();

//CORS
app.use(cors())
//Public directory
app.use(express.static("public"));
//Read and parse body
app.use(express.json());
//Routes
app.use("/api/v1/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}...`);
});
