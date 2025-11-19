const { body } = require('express-validator');

const signupValidation = [
  body('firstName').trim().notEmpty().withMessage('firstName is required'),
  body('lastName').trim().notEmpty().withMessage('lastName is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('password min length 6'),
  body('confirmPassword').custom((value, { req }) => {
    if (req.body.password && value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }).withMessage('confirmPassword must match password'),
  body('phone').optional().isString(),
  body('nationalId').optional().isString(),
  body('jobTitle').optional().isString(),
  body('organization').optional().isString(),
  body('roleId').optional().isUUID(),
  body('roleName').optional().isString(),
  body('preferences').optional().isObject(),
  body('metadata').optional().isObject(),
  body('mfaEnabled').optional().isBoolean(),
  body('mfaSecret').optional().isString(),
  body('isActive').optional().isBoolean(),
  body('isVerified').optional().isBoolean(),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('password is required'),
];

module.exports = { signupValidation, loginValidation };