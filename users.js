require('dotenv').config();

const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/users');

router.post('/signup', (req, res, next) => {
  // Basic input validation
  if (!req.body.email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Email already exists',
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });

            newUser
              .save()
              .then((result) => {
                // Don't send back the password hash
                const userResponse = {
                  _id: result._id,
                  email: result.email,
                };

                res.status(201).json({
                  message: 'User created successfully',
                  userCreated: userResponse,
                });
              })
              .catch((err) => {
                console.error('Error saving user:', err);
                res.status(500).json({
                  error: 'Failed to create user',
                  details: err.message,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.error('Error finding user:', err);
      res.status(500).json({
        error: 'Server error during signup',
        details: err.message,
      });
    });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Auth failed' });
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        console.log('Compare error:', err);
        console.log('Compare result:', result);

        if (err || !result) {
          return res.status(401).json({ message: 'Auth failed' });
        }

        console.log('JWT KEY:', process.env.JWT_KEY);

        const token = jwt.sign(
        		{
        			email: user.email,
        			userId: user._id
        		},
        		process.env.JWT_KEY,
        		{
        			expiresIn: '1h'
        		}
        	);

        return res.status(200).json({
          message: 'Auth successful',
          token: token,
          user: user,
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
});

router.delete('/userId', (req, res, next) => {
  const id = req.params.userId;

  User.findByIdAndDelete(id)
    .exec.then((result) => {
      res.status(201).json({
        message: 'user removed',
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
