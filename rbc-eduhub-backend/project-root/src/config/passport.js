const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const authService = require('../services/auth.service');

function setupPassport() {
  // Google
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || `${process.env.BACKEND_ORIGIN || ''}/api/auth/google/callback`
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        // create/update SocialAuth + user
        const user = await authService.socialSignIn('google', profile, { accessToken, refreshToken });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }));
  }

  // LinkedIn
  if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
    passport.use(new LinkedInStrategy({
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL || `${process.env.BACKEND_ORIGIN || ''}/api/auth/linkedin/callback`,
      scope: ['r_liteprofile', 'r_emailaddress'],
      state: true
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await authService.socialSignIn('linkedin', profile, { accessToken, refreshToken });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }));
  }

  // Passport serialize/deserialize (not used with session: false but included for completeness)
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const { User } = require('../model');
      const u = await User.findByPk(id);
      done(null, u);
    } catch (e) { done(e); }
  });
}

module.exports = setupPassport;
