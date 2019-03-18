// Should act as a helper module for sending emails.

// Package imports
const sgMail = require('@sendgrid/mail');

// constructor for emailer
const Emailer = function() {
    this.apiKey = process.env.SENDGRID_API_KEY;
    this.fromEmail = process.env.SENDGRID_SENDER_EMAIL;

    if (!apiKey)
        console.error('It appears your API Key is missing. Check your dotenv setup.');

    if (!fromEmail)
        console.error('It appears your Sender Email is missing. Check your dotenv setup.');

    sgMail.setApiKey(apiKey);
}

// This returns a promise
Emailer.prototype.sendMessage = function(recipient, subject, text) {
    const msg = {
        to: recipient,
        from: this.fromEmail,
        subject: subject,
        text: text,
        html: text
    };

    return sgMail.send(msg);
};

// Module export for use in routes
module.exports = Emailer;
