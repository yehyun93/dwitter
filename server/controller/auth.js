import * as userRepository from '../data/auth.js';

import {} from 'express-async-error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Make it secure
const jwtSecretKey = 'VfscKl!PwamtWGmCrSq1R2VWlA9ZH^&q';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);

  if(found) {
    return res.status(409).json({ message : `${username} already exists` });
  }

  const hashed = await encryptPassword(password);
  const userId = await userRepository.create({username, password: hashed, name, email, url});

  const token = createToken(userId);

  res.status(201).json({token, userId});
}

export async function login(req, res) {
  const {username, password} = req.body;
  const user = await userRepository.findByUsername(username);

  if(!user) {
    return res.status(401).json({message:'Invalid user or password'});
  }

  // 보안 때문에 id pwd중에 뭐가 잘못됬는지 알려주지 않음
  const isValidPassword = await bcrypt.compare(password, user.password);
  if(!isValidPassword) {
    return res.status(401).json({message:'Invalid user or password'});
  }

  const token = createToken(user.id);
  return res.status(200).json({token, username});
}

function encryptPassword(password) {
  return bcrypt.hash(password, bcryptSaltRounds);
}

function createToken(userId) {
  return jwt.sign({id: userId}, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if(!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username});
}