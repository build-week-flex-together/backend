// Starter script for verifying twilio functionality.
// This script, along with other start scripts, are not covered by TDD. 

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console

// Package imports
const dotenv = require('dotenv');
const twilio = require('twilio');

// dotenv init
dotenv.config();

// Twilio auth items check
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const testReceiverPhoneNumber = process.env.TWILIO_TEST_RECEIVER_PHONE_NUMBER;

if (!accountSid)
    console.error('Your Twilio Account SID appears to be missing. Check your dotenv setup.');

if (!authToken)
    console.error('Your Twilio Auth Token appears to be missing. Check your dotenv setup.');

if (!phoneNumber)
    console.error('Your Twilio Phone Number appears to be missing. Check your dotenv setup.');

if (!testReceiverPhoneNumber)
    console.error('Your Test Receiver Phone Number appears to be missing. Check your dotenv setup.')

// Twilio client init
const client = twilio(accountSid, authToken);

// Send trial message
client.messages
    .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: phoneNumber,
        to: testReceiverPhoneNumber
    })
    .then(message => console.log(message.sid));
