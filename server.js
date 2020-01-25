const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

// ================ MONGO DB ================ //
mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;

connection.on('error', () => console.log('Failed to establish connection with MongoDB'));
connection.once('open', () => console.log('MongoDB connection established sucessfully'));

// ================ APPLICATION ================ //
const app = express();

// Json
// Cors

// ================ HERE MAGIC HAPPENS ================ //

// Magic

// ================ RUN BITCH ================ //
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is Running on port: ${port}`);
});
