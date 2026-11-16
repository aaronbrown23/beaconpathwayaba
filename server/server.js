require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const helmet  = require('helmet');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      styleSrc:   ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
      fontSrc:    ["'self'", 'https://fonts.gstatic.com'],
      imgSrc:     ["'self'", 'data:'],
      connectSrc: ["'self'"],
    },
  },
}));

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000' }));

const FRONTEND = path.join(__dirname, '..');
app.use(express.static(FRONTEND, { index: false }));

const noCache = (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  next();
};

app.get('/', noCache, (req, res) => res.sendFile(path.join(FRONTEND, 'index.html')));

app.listen(PORT, () => {
  console.log(`\nBeacon Pathway ABA`);
  console.log(`Server running at http://localhost:${PORT}\n`);
});
