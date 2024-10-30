const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'default_google_client_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'default_google_client_secret',
    callbackURL: "/api/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = await new User({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
            }).save();
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

// LinkedIn Strategy
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID || 'default_linkedin_client_id',
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET || 'default_linkedin_client_secret',
    callbackURL: "/api/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ linkedinId: profile.id });
        if (!user) {
            user = await new User({
                linkedinId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
            }).save();
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || 'default_github_client_id',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'default_github_client_secret',
    callbackURL: "/api/auth/github/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
            user = await new User({
                githubId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
            }).save();
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));
