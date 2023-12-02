const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

const products = require('./routes/products_routes');

// Loading ENV variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Mount routers
app.use('/api/v1/products', products);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is started in ${process.env.NODE_ENV} mode at port:${PORT}`.magenta
      .bold
  );
});
