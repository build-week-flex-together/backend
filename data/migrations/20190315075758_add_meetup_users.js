// Migration #4: Add meetup_users table

/*
| Name      | Type | Default | Constraints     | Description                          |
| --------- | ---- | ------- | --------------- | ------------------------------------ |
| id        | int  | AI      | PRIMARY KEY     | The primary incrementing ID.         |
| meetup_id | int  | none    | FOREIGN KEY     | The meetup ID.                       |
| user_id   | int  | none    | FOREIGN KEY     | The user ID partaking in the meetup. | 
*/
exports.up = function(knex, Promise) {
    return knex.schema.createTable('meetup_users', table => {
        table.increments('id');
        table.integer('meetup_id').references('meetups.id');
        table.integer('user_id').references('users.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('meetup_users');
};
