import express from 'express';
import 'express-async-error';
import { body, param } from 'express-validator';
import * as authController from '../controller/auth.js'
import { isAuth } from '../middleware/auth.js';
import {validate} from '../middleware/validator.js'

const router = express.Router();

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('username sholud be at least 5 charactors'),
  body('password')
    .trim()
    .isLength({min: 5})
    .withMessage('password should be at least 5 charactors'),
  validate
];

const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url').isURL().withMessage('invalid URL').optional({
    nullable: true, checkFalsy: true
  })
];

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateCredential, authController.login);
router.get('/me', isAuth, authController.me);

export default router;