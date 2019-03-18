// Migration #2: Add preferred_times table

/*
| Name     | Type    | Default | Constraints     | Description                                   |
| -------- | ------- | ------- | --------------- | --------------------------------------------- |
| id       | int     | AI      | PRIMARY KEY     | The primary incrementing ID.                  |
| user_id  | int     | none    | FOREIGN KEY     | The ID of the user that this time is for.     |
| timezone | varchar | none    | NOT NULL        | The timezone of the listed time.              |
| day      | int     | 0       | NOT NULL        | The ISO-8601 day of the week.                 |
| hour     | int     | 0       | NOT NULL        | The ISO-8601 hour.                            |
| minute   | int     | 0       | NOT NULL        | The ISO-8601 minute.                          | 
*/

exports.up = function(knex, Promise) {
    return knex.schema.createTable('preferred_times', table => {
        table.increments('id');
        table.integer('user_id').references('users.id');
        table.string('timezone', 64);
        table.integer('day');
        table.integer('hour');
        table.integer('minute');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('preferred_times');
};
