// Migration #1: Add users table

/*
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
*/

exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.integer('user_type');
        table.string('name', 240);
        table.string('email', 340);
        table.string('phone', 40);
        table.boolean('verified');
        table.boolean('notify_email');
        table.boolean('notify_sms');
        table.integer('mobility_level');
        table.unique('email');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
