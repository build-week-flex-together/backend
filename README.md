# FlexTogether Backend API
#### Template borrowed from Bhumi Patel's FlexTogether README

## Deployed URL

- *Not deployed yet...*

## Default Error Codes

| Error Code | Error Name            | Description                                     |
| ---------- | --------------------- | ----------------------------------------------- |
| 400        | Bad Request           | Your JSON was missing fields.                   |
| 422        | Unprocessable Entity  | Your fields did not pass individual validation. |
| 500        | Internal Server Error | Something on the server goofed.                 |

## Special Data Types

### UserType - Used for describing the type of user using this website.

Data Type: Number

| Value | Name        |
| ----- | ----------- |
| 0     | Unspecified |
| 1     | Enrollee    |
| 2     | Companion   |

### MobilityLevel - Used for describing the level of physical mobility a user has.

Data Type: Number

| Value | Name        |
| ----- | ----------- |
| 0     | Unspecified |
| 1     | Low         |
| 2     | Medium      |
| 3     | High        |
        
### AvailabilityTime - Used for describing a day of time within a week.

Data Type: Object

| Name     | Type    | Description                                                       |
| -------- | ------- | ----------------------------------------------------------------- |
| timezone | string  | moment.js timezone unique identifier (i.e. 'America/Los_Angeles') |
| day      | number  | ISO-8601 day of week (i.e. 0 = Monday)                            |
| hour     | number  | ISO-8601 hour (0-23)                                              |
| minute   | number  | ISO-8601 minute (0-59)                                            |

#### Example:

```json
{
    "timezone": "America/Los_Angeles",
    "day": 1
    "hour": 14
    "minute": 29
}
```

## Register - When a user completes the onboarding survey.

HTTP Method: `POST`

URL: `/api/onboarding/register`

### Headers

| Name         | Type   | Required | Description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

```json
{
    "my_info": {
        "userType: {userType integer},
        "name: {string},
        "email: {email string},
        "phone: {phone string},
        "notifyEmail: {boolean},
        "notifyPhone: {boolean},
        "mobility: {mobilityLevel integer},
        "availabilityTimes": {array of AvailabilityTime objects}
    },
    "inviteInfo": {
        "name": {string},
        "email": {email string},
        "phone": {phone string},
        "mobility": {mobilityLevel integer}
    }
}
```

### Notable Responses:

**201 (Created)**

> The information was successfully submitted. There is no response body.

## Verify Email - When a user clicks the link received in their email, the React application should follow up with this request.

HTTP Method: `POST`

URL: `/api/onboarding/verifyEmail/:key`

### Headers

| Name         | Type   | Required | Description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Parameters

| Name | Type   | Required | Description                                                                     |
| ---- | ------ | -------- | ------------------------------------------------------------------------------- |
| key  | String | Yes      | A random-looking string that should be supplied in the verification email link. |

### Notable Responses:

**201 (Created)**

> The email was successfully verified, and the invite tied to this registration was sent through email/SMs. There is no response body.

## Confirm Invite - When an invited user click the link received in their email/SMS, the React application should follow up with this request.

HTTP Method: `GET`

URL: `/api/onboarding/confirmInvite/:key`

### Headers

| Name         | Type   | Required | Description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Parameters

| Name | Type   | Required | Description                                                         |
| ---- | ------ | -------- | ------------------------------------------------------------------- |
| key  | String | Yes      | A random-looking string that should be supplied in the invite link. |

### Response:

**200 (OK)**

> The invite was confirmed, and the user is allowed to continue onboarding. The response body is as follows:

```json
{
  "inviter_name": {string, the name of the user who invited this user},
  "availabilityTimes": {array of AvailabilityTime objects}
}
```

## Confirm Time - When an invited user has managed to decide on a time for the two users to meet up, the React application should send this request.

HTTP Method: `POST`

URL: `/api/onboarding/confirmTime/:inviteKey`

### Headers

| Name         | Type   | Required | Description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Parameters

| Name        | Type   | Required | Description                                                        |
| ---------- | ------ | -------- | ------------------------------------------------------------------- |
| inviteKey  | String | Yes      | A random-looking string that should be supplied in the invite link. |

### Body

```json
{
    "confirmedTime": {AvailabilityTime object of the consensus time}
}
```

### Response:

**201 (Created)**

> The time was accepted, and both users have been emailed/SMS'd regarding the new meetup time. There is no response body.
