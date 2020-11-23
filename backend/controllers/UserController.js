import User from '../models/User.js';
import bcrypt from 'bcrypt';
//const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'
export async function signup (req,res) {
  req.body.email = req.body.email.toLowerCase();
  const password = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await new User({...req.body, password}).save();
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 yeqr
    });
    delete user['__v'];
    console.log({user});
    console.log(req.cookies);
    res.json(user);
  } catch(e) {
    res.send('Error');
  }

}