if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const path = require('path');

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'imgs' ,'favicon.ico')));

app.use('/', require('./routes/index'));

const unknownEndpoint = (req, res) => {
  res.render('404');
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
