const app = require('./src/app');

const port = process.env.PORT || 3001;

// Start the server
app.listen(port, function () {
  console.log(`IMDb Scrapping running at port ${port}.`);
});