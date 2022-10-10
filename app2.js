/** @format */

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'Hi there, learn before you earn' });
});

app.post('/login', (req, res) => {
  const user = {
    id: 2,
    name: 'Vishnu',
    bestfriend: 'Shiva',
  };
  console.log('login performed');
  jwt.sign({ user: user }, 'secretkey', (err, token) => {
    if (err) {
      console.log('01');
      res.sendStatus(403);
    } else {
      console.log('02');
      res.json({
        token,
      });
    }
  });
});

app.post('/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      console.log('Not able to verify');
      res.sendStatus(403);
    } else {
      res.json({ msg: 'Post has been successfully completed', authData });
    }
  });
});

function verifyToken(req, res, next) {
  //make token

  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    console.log('in function');
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    console.log('Function complete');
    next();
    console.log('Next');
  } else {
    console.log('In function 02');
    res.sendStatus(403);
  }
}

app.listen(8008);
