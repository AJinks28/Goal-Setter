const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

//middleware so that we can access the req.body in POST reqs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin : ["https://localhost:3000"],
  })
)

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

//override the default ecpress error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
