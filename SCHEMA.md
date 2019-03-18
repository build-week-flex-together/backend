# Database Schema for FlexTogether Onboarding

## Table: users

| Name           | Type    | Default | Constraints     | Description                                   |
| -------------- | ------- | ------- | --------------- | --------------------------------------------- |
| id             | int     | AI      | PRIMARY KEY     | The primary incrementing ID.                  |
| user_type      | int     | 0       | NOT NULL        | The type of user for this service.            |
| name           | varchar | none    | NOT NULL        | The name of the user.                         |
| email          | varchar | none    | NOT NULL UNIQUE | The email of the user.                        |
| phone          | varchar | none    | NOT NULL        | The phone number of the user.                 |
| verified       | bit     | 0       | NOT NULL        | Whether the user's email is verified or not.  |
| notify_email   | bit     | 1       | NOT NULL        | If the user should be notified through email. |
| notify_sms     | bit     | 1       | NOT NULL        | If the user should be notified through SMS.   |
| mobility_level | int     | 0       | NOT NULL        | The level of mobility that the user has.      |

## Table: preferred_times

| Name     | Type    | Default | Constraints     | Description                                   |
| -------- | ------- | ------- | --------------- | --------------------------------------------- |
| id       | int     | AI      | PRIMARY KEY     | The primary incrementing ID.                  |
| user_id  | int     | none    | FOREIGN KEY     | The ID of the user that this time is for.     |
| timezone | varchar | none    | NOT NULL        | The timezone of the listed time.              |
| day      | int     | 0       | NOT NULL        | The ISO-8601 day of the week.                 |
| hour     | int     | 0       | NOT NULL        | The ISO-8601 hour.                            |
| minute   | int     | 0       | NOT NULL        | The ISO-8601 minute.                          | 

## Table: meetups

| Name     | Type    | Default | Constraints     | Description                                   |
| -------- | ------- | ------- | --------------- | --------------------------------------------- |
| id       | int     | AI      | PRIMARY KEY     | The primary incrementing ID.                  |
| timezone | varchar | none    | NOT NULL        | The timezone of the listed time.              |
| day      | int     | 0       | NOT NULL        | The ISO-8601 day of the week.                 |
| hour     | int     | 0       | NOT NULL        | The ISO-8601 hour.                            |
| minute   | int     | 0       | NOT NULL        | The ISO-8601 minute.                          | 

# Table: meetup_users

| Name      | Type | Default | Constraints     | Description                          |
| --------- | ---- | ------- | --------------- | ------------------------------------ |
| id        | int  | AI      | PRIMARY KEY     | The primary incrementing ID.         |
| meetup_id | int  | none    | FOREIGN KEY     | The meetup ID.                       |
| user_id   | int  | none    | FOREIGN KEY     | The user ID partaking in the meetup. | 

# Table: invites

| Name       | Type | Default | Constraints     | Description                          |
| ---------- | ---- | ------- | --------------- | ------------------------------------ |
| id         | int  | AI      | PRIMARY KEY     | The primary incrementing ID.         |
| inviter_id | int  | none    | FOREIGN KEY     | The user who is inviting the other.  | 
| invitee_id | int  | none    | FOREIGN KEY     | The user being invited.              | 
