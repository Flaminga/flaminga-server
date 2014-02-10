module.exports = {
  db: 'localhost',

  sendgrid: {
    user: 'Your SendGrid Username',
    password: 'Your SendGrid Password'
  },

  twitter: {
    consumerKey: 'Your Twitter Consumer Key',
    consumerSecret: 'Your Twitter Consumer Secret',
    callbackURL: '/auth/twitter/callback',
    passReqToCallback: true
  },
}
