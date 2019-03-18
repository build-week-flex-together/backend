// Helper function for generating json web tokens
const jwt = require('jsonwebtoken');

const JWT_EXPIRE_TIME = '1h';

const JWT_SECRET = process.env.JWT_SECRET || 'The JSON Web Token Secret still needs to be configured...';

// Generate email verification token
const createVerifyToken = function(user_id) {
    return jwt.sign({ type: 'verify', user_id: user_id }, JWT_SECRET, { expiresIn: JWT_EXPIRE_TIME });
};

// Generate invite token
const createInviteToken = function(inviter_id, invitee_id) {
    return jwt.sign({ type: 'invite', inviter_id: inviter_id, invitee_id: invitee_id }, JWT_SECRET, { expiresIn: JWT_EXPIRE_TIME });
};

// check email verification token
const checkVerifyToken = function(token) {
    try {
        const payload = jwt.verify(token, JWT_SECRET);

        if (payload.type !== 'verify')
            return null;
        
        return user_id;
    }
    catch (err) {
        console.log('JWT verify token check failed!');
        console.log(err);
        return null;
    }
};

// check invite token
const checkInviteToken = function(token) {
    try {
        const payload = jwt.verify(token, JWT_SECRET);

        if (payload.type !== 'invite')
            return null;
        
        return {
            inviter_id: payload.inviter_id,
            invitee_id: payload.invitee_id
        };
    }
    catch (err) {
        console.log('JWT invite token check failed!');
        console.log(err);
        return null;
    }
};

module.exports = {
    createVerifyToken,
    createInviteToken,
    checkVerifyToken,
    checkInviteToken
};
