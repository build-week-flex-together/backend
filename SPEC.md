# MVP Expected User Flow:

1. User starts onboarding. 
2. At end of survey, stores user data and sends an email verification request. 
3. At email verification, updates user data and sends email/SMS to invited friend. 
4. At email/SMS invite, send user time data. 
5. At end of time survey, finalizes user data and stores in confirmed table. 

# MVP Expected Request Flow:

1. Onboarding Survey Data -> Register
2. Email Link Request -> VerifyEmail
3. Invite Link Request -> ConfirmInvite
4. Confirm Time Request -> ConfirmTime

# MVP Expected Response Tasks

## Register 

1. Store onboarding data.
2. Generate email verification JWT.
3. Send email verification link in email with SendGrid. 
4. Return 201. 

## VerifyEmail

1. Confirm email in onboarding data.
2. Generate invite JWT.
3. Send invite token in email with SendGrid and in SMS with Twilio to invitee.
4. Return 201.
    
## ConfirmInvite

1. Confirm email in friend data. 
2. Get User 1 name and preferred times. 
3. Return name and preferred times.
    
## ConfirmTime

1. Write in all needed onboarding data. 
2. Notify inviter with email and SMS about upcoming time. 
3. Notify invitee with email and SMS about upcoming time. 
4. Return 201. 

# Backend Technical Tasks

- Store user data. 
- Store time in UTC but provide timezone for conversion. 
- Generate and store random string keys. 
- Send an email through Sendgrid. 
- Send a SMS through Twilio. 
