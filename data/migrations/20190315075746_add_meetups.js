// Migration #3: Add meetups table

/*
| Name     | Type    | Default | Constraints     | Description                                   |
| -------- | ------- | ------- | --------------- | --------------------------------------------- |
| id       | int     | AI      | PRIMARY KEY     | The primary incrementing ID.                  |
| timezone | varchar | none    | NOT NULL        | The timezone of the listed time.              |
| day      | int     | 0       | NOT NULL        | The ISO-8601 day of the week.                 |
| hour     | int     | 0       | NOT NULL        | The ISO-8601 hour.                            |
| minute   | int     | 0       | NOT NULL        | The ISO-8601 minute.                          | 
*/

exports.up = function(knex, Promise) {
    return knex.schema.createTable('meetups', table => {
        table.increments('id');
        table.string('timezone', 64);
        table.integer('day');
        table.integer('hour');
        table.integer('minute');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('meetups');
};
