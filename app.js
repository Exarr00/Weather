if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.use('/', require('./routes/index'));

const unknownEndpoint = (req, res) => {
  res.render('404');
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
