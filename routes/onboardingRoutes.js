// Should contain an Express router serving all four onboarding routes 
const express = require('express');

const db = require('../data/helpers/db');
const tokenUtils = require('../utils/tokenUtils');

const router = express.Router();

// POST /api/onboarding/register
// Return 201
router.post('/register', (req, res) => {
    if (!req.body || !req.body.myInfo || !req.body.inviteInfo) {
        res.status(400).json({ error: 'Must include myInfo and inviteInfo in body' });
        return;
    }

    if (!req.body.myInfo.userType || !req.body.myInfo.name || !req.body.myInfo.email || !req.body.myInfo.phone 
        || req.body.myInfo.notifyEmail === null || !req.body.myInfo.notifyPhone === null 
        || !req.body.myInfo.mobility || !req.body.myInfo.availabilityTimes) {
            res.status(400).json({ 
                error: 'Must include userType, name, email, phone, notifyEmail, notifyPhone, mobility, and availabilityTimes in body.myInfo' 
            });
            return;
    }

    if (!req.body.inviteInfo.name || !req.body.inviteInfo.email 
        || !req.body.inviteInfo.phone || !req.body.inviteInfo.mobility) {
            res.status(400).json({ 
                error: 'Must include name, email, phone, and mobility in body.inviteInfo' 
            });
            return;
    }

    const user_a = {
        user_type: req.body.myInfo.userType,
        name: req.body.myInfo.name,
        email: req.body.myInfo.email,
        phone: req.body.myInfo.phone,
        verified: false,
        notify_email: req.body.myInfo.notifyEmail,
        notify_sms: req.body.myInfo.notifyPhone,
        mobility_level: req.body.myInfo.mobility
    };

    const user_b = {
        user_type: 2,
        name: req.body.inviteInfo.name,
        email: req.body.inviteInfo.email,
        phone: req.body.inviteInfo.phone,
        verified: false,
        notify_email: true,
        notify_sms: true,
        mobility_level: req.body.inviteInfo.mobility
    };

    const emailer = req.app.get('emailer');
    let times = req.body.myInfo.availabilityTimes;
    let user_ids = [];
    let token = '';

    const userAPromise = () => db.insertUser(user_a);
    const userBPromise = () => db.insertUser(user_b);
    const timesPromise = () => db.insertTimes(times);
    const invitePromise = ids => db.insertInvite(ids);
    const emailPromise = verifyToken => emailer.sendMessage(user_a.email, 'Your FlexTogether Verification Token', verifyToken);

    userAPromise()
        .then(([id])=> {
            user_ids.push(id);
            times = times.map(time => { return { user_id: id, ...time }; });
            return userBPromise();
        })
        .then(([id])=> {
            user_ids.push(id);
            token = tokenUtils.createVerifyToken(user_ids[0]);
            return timesPromise();
        })
        .then(_ => invitePromise(user_ids))
        .then(_ => emailPromise(token))
        .then(_ => {
            res.status(201).end();
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Could not insert new onboarding data!' });
        });
});

// POST /api/onboarding/verifyEmail/:token
// Returns 201
router.post('/verifyEmail/:token', (req, res) => {
    if (!req.params || !req.params.token) {
        res.status(400).json({ error: 'Must include token in params' });
        return;
    }

    const user_id = tokenUtils.checkVerifyToken(req.params.token);

    if (user_id === null) {
        res.status(422).json({ error: 'Token was invalid' });
        return;
    }

    const emailer = req.app.get('emailer');
    const texter = req.app.get('texter');
    const verifyPromise = () => db.verifyUserEmail(user_id);
    const invitesPromise = () => db.getUserInvites(user_id);
    const deleteInvitesPromise = () => db.deleteUserInvites(user_id);

    db.verifyUserEmail(user_id)
        .then(_ => invitesPromise())
        .then(invitees => {
            return Promise.all(invitees.map(({ invitee_id })=> {
                const token = tokenUtils.createInviteToken(user_id, invitee_id);
                const getEmailPromise = () => db.getUserEmail(invitee_id);
                const sendEmailPromise = invitee_email => emailer.sendMessage(invitee_email, 'Your FlexTogether Invite Token', token);
                const getPhonePromise = () => db.getUserPhone(invitee_id);
                const sendPhonePromise = invitee_phone => texter.sendMessage(invitee_phone, `Your FlexTogether Invite Token: ${token}`);

                return getEmailPromise()
                    .then(users => sendEmailPromise(users[0].email))
                    .then(_ => getPhonePromise())
                    .then(users => sendPhonePromise(users[0].phone));
            }));
        })
        .then(_ => deleteInvitesPromise())
        .then(_ => {
            res.status(201).end();
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Could not verify email' });
        });
});

// GET /api/onboarding/confirmInvite/:token
// Return inviter name and preferred times
router.get('/confirmInvite/:token', (req, res) => {
    if (!req.params || !req.params.token) {
        res.status(400).json({ error: 'Must include token in params' });
        return;
    }

    const data = tokenUtils.checkInviteToken(req.params.token);

    if (data === null) {
        res.status(422).json({ error: 'Token was invalid' });
        return;
    }

    Promise.all([db.getUserName(data.inviter_id), db.getUserTimes(data.inviter_id), db.verifyUserEmail(data.invitee_id)])
        .then(([name, times]) => {
            res.status(200).json({ inviter_name: name, availabilityTimes: times });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Could not verify invite' });
        });
});

// POST /api/onboarding/confirmTime/:token
// Return 201 
router.post('/confirmTime/:token', (req, res) => {
    if (!req.params || !req.params.token) {
        res.status(400).json({ error: 'Must include token in params' });
        return;
    }

    if (!req.body || !req.body.confirmedTime) {
        res.status(400).sjon({ error: 'Must include confirmedTime in body' });
        return;
    }

    const data = tokenUtils.checkInviteToken(req.params.token);

    if (data === null) {
        res.status(422).json({ error: 'Token was invalid' });
        return;
    }

    const meetup = {
        timezone: req.body.confirmedTime.timezone,
        day: req.body.confirmedTime.day,
        hour: req.body.confirmedTime.hour,
        minute: req.body.confirmedTime.minute
    };

    const emailer = req.app.get('emailer');
    const texter = req.app.get('texter');

    const meetupPromise = () => db.insertMeetup(meetup);
    const meetupUsersPromise = meetup_id => db.insertMeetupUsers(meetup_id, [data.inviter_id, data.invitee_id]);
    
    meetupPromise()
        .then(([id])=> meetupUsersPromise(id))
        .then(_ => {
            res.status(201).end();
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Could not create new meetup' });
        });
});

module.exports = router;
