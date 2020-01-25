const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const modelInjector = require('./helpers/model-injector');
const utilsInjector = require('./helpers/utils-injector');
const { errorHandler, requestHandler, notFoundHandler } = require('./handlers');

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

app.use(cors());
app.use(express.json());

// ================ HERE MAGIC HAPPENS ================ //

app.use(modelInjector);
app.use(utilsInjector);

// Magic

app.use(errorHandler);
app.use(notFoundHandler);
app.use(requestHandler);

// ================ RUN BITCH ================ //
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is Running on port: ${port}`);
});