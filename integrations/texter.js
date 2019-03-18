// Should act as a helper module for sending text messages.

// Package imports
const twilio = require('twilio');

// Constructor for Texter
const Texter = function() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
    this.phoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid)
        console.error('Your Twilio Account SID appears to be missing. Check your dotenv setup.');

    if (!authToken)
        console.error('Your Twilio Auth Token appears to be missing. Check your dotenv setup.');

    if (!phoneNumber)
        console.error('Your Twilio Phone Number appears to be missing. Check your dotenv setup.');
    
    this.client = twilio(accountSid, authToken);
};

// sendMessage returns a promise
Texter.prototype.sendMessage = function(recipient, text) {
    const msg = {
        body: text,
        from: this.phoneNumber,
        to: recipient
    };

    return this.client.messages.create(msg);
};

// Export for use in routes
module.exports = Texter;
