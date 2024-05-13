require('dotenv').config();
const PORT = process.env.PORT
const express = require('express');
// const configExpress = require('./config/express');
const configMongoose = require('./config/mongoose');
const routes = require('./routes/Index');
// const errorMiddleware = require('./middleware/errorMiddleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Configure Express
// configExpress(app)
app.use(cors());

  // Parse incoming requests with JSON payloads
  app.use(bodyParser.json());
// Configure Mongoose
configMongoose();

// Use routes
app.use('/ecommerce', routes);

// Error handling middleware
// app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
module.exports = app;