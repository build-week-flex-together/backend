const db = require('../dbConfig');
// Should act as a helper module for database queries.

module.exports = {
    insertUser,
    verifyUserEmail,
    getUserInvites,
    deleteUserInvites,
    getUserEmail,
    getUserName,
    getUserTimes,
    insertMeetup,
    insertMeetupUsers
}

// Insert user
const insertUser = function(user) {
    return db('users').insert(user).returning('id');
};

// Update user with verified email
const verifyUserEmail = function(id) {
    return db('users').where({ id }).update({ verified: true }).returning('id');
};

// Get invites from verified_user 
const getUserInvites = function(id) {
    return db('invites').where({ inviter_id: id }).select('invitee_id');
};

// Delete invites from verified_user
const deleteUserInvites = function(id) {
    return db('invites').where({ inviter_id: id }).del();
};

// Get emails from user ID 
const getUserEmail = function(id) {
    return db('users').where({ id }).select('email');
};

// Get a user's name
const getUserName = function(id) {
    return db('users').where({ id }).select('name');
};

// Get a user's preferred times
const getUserTimes = function(id) {
    return db('preferred_times').where({ user_id: id });
};

// Insert meetup
const insertMeetup = function(meetup) {
    return db('meetups').insert(meetup).returning('id');
};

// Insert meetup_users
const insertMeetupUsers = function(meetup_id, user_ids) {
    let inserts = [];
    user_ids.forEach(id => {
        inserts.push({
            meetup_id: meetup_id,
            user_id: id
        });
    });
    return db('meetup_users').insert(inserts).returning('id');
};
