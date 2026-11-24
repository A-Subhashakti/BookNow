require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const seed = require('./utils/seed');

connectDB().then(async () => {
  await seed();
  app.listen(process.env.PORT || 5000, () => console.log('BookNow API running'));
});
