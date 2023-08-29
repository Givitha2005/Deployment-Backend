require("dotenv").config();
const express = require("express");
const db = require("./db/connect");
const cors = require("cors");

const app = express();

// connecting db
db();

// Importing Routes
const employeeRoutes = require("./routes/employees.routes");

app.use(express.json());
app.use(cors());

// Adding Custom Middleware
app.use("/api", employeeRoutes); 


app.get('/', (req, res) => {
  res.send('Employees Records')
});


const PORT = process.env.PORT || 13001;

app.listen(PORT, () => {
  console.log(`Application is running on PORT ${PORT}`);
});
