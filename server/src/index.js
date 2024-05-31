const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const tourRouter = require('./routes/tours');
const guestsRouter = require('./routes/guests');
const bookingsRouter = require('./routes/bookings');
const usersRouter = require('./routes/users');
const invoicesRouter = require('./routes/invoices')

const connectToDb = require('./util/mysql').connectToDb;

const app = express();
const port = process.env.PORT || 3000;

connectToDb()
  .then(function() {
    console.log('Database & tables created!');
  })
  .catch(function(err) {
    console.log('Error: ' + err.message);
  });

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(tourRouter);
app.use(guestsRouter);
app.use(bookingsRouter);
app.use(usersRouter);
app.use(invoicesRouter);

app.listen(port, function() {
  console.log('Server is running on http://localhost:' + port);
});
