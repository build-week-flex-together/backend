// Migration #5: Add invites table

/*
| Name       | Type | Default | Constraints     | Description                          |
| ---------- | ---- | ------- | --------------- | ------------------------------------ |
| id         | int  | AI      | PRIMARY KEY     | The primary incrementing ID.         |
| inviter_id | int  | none    | FOREIGN KEY     | The user who is inviting the other.  | 
| invitee_id | int  | none    | FOREIGN KEY     | The user being invited.              | 
*/

exports.up = function(knex, Promise) {
    return knex.schema.createTable('invites', table => {
        table.increments('id');
        table.integer('inviter_id').references('users.id');
        table.integer('invitee_id').references('users.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('invites');
};
