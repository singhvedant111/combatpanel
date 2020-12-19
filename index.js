const path = require('path');
const express = require('express');
const layout = require('express-layout');
const fs = require('fs');
const routes = require('./routes/members');
const hbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
app.engine('hbs',hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir:__dirname+'/views/layouts',helpers: require("./helpers.js").helpers}));
app.set('views',path.join(__dirname, '/views'));
app.set('view engine','hbs');
app.use('/', routes);
const middlewares = [
     layout(),
     express.static(path.join(__dirname, 'public')),
     bodyParser.urlencoded({ extended: true }),
   ];
app.use(middlewares);
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(5000, () => {
  console.log('App running at http://localhost:5000');
});





