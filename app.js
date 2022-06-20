const express = require("express");
const connectDB = require("./DB/database");
const eventRoutes = require("./api/events/events.routes");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/api/events", eventRoutes);


connectDB();
app.listen(PORT);
