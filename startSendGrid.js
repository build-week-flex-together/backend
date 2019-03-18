// Starter script for verifying sendgrid functionality.

// Package imports
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');

// dotenv init
dotenv.config();

// env vars check
const apiKey = process.env.SENDGRID_API_KEY;
const fromEmail = process.env.SENDGRID_SENDER_EMAIL;
const testToEmail = process.env.SENDGRID_TEST_RECEIVER_EMAIL;

if (!apiKey)
  console.error('It appears your API Key is missing. Check your dotenv setup.');

if (!fromEmail)
  console.error('It appears your Sender Email is missing. Check your dotenv setup.');

if (!testToEmail)
  console.log('It appears your Test Receiver Email is missing. This is not an issue outside of testing. Check your dotenv setup.');

// Mailer init with api key
sgMail.setApiKey(apiKey);

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const msg = {
  to: testToEmail,
  from: fromEmail,
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

// The send function is a chainable promise.
sgMail.send(msg).then(email => console.log(email[0]["statusMessage"]));
