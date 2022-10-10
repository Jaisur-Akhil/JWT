/** @format */

const express = require('express');
const jwt = require('jsonwebtoken'); //1

const app = express();

app.get('/api', (req, res) => {
  res.json({
    mes: 'Everything running as i am learning',
  });
  console.log('running');
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      console.log('error at post');
      res.sendStatus(404);
    } else {
      console.log('in Posts');
      res.json({ msg: 'Post Created', authData });
    }
  });
});

app.post('/api/login', (req, res) => {
  console.log('login attempt');
  const user = { // user data, key value
    id: 1,
    username: 'akhil',
    email: 'akhil@gmail.com',
  };
  jwt.sign({ user: user }, 'secretkey', (err, token) => { // jwt.sign - token
    console.log('jwt singin');
    res.json({
      token,
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
app.listen(8005);
