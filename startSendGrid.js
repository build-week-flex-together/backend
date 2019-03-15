// Starter script for verifying sendgrid functionality.
// This script, along with other start scripts, are not covered by TDD. 

// Package imports
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');

// dotenv init
dotenv.config();

if (process.env.SENDGRID_API_KEY)
  console.log(`Your API Key is: ${process.env.SENDGRID_API_KEY}`);
else
  console.log(`It appears your API Key is missing. Check your dotenv setup. (API Key: ${process.env.SENDGRID_API_KEY})`);

// Mailer init with api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail.send(msg);