const express = require('express');
const mongoose = require('mongoose');

const app = express();
const authRoute = require('./routes/authRoutes');
app.use(express.json());

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://admin:test123@cluster0.oi8r8.mongodb.net/Users?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => console.log('Database Connected'))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoute);

app.listen(3000,()=>
{
  console.log(`Listening Now`);
});