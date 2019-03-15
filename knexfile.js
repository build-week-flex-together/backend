module.exports = {
    development: {
        client: 'sqlite3',
        connection: { filename: './data/db.db3' }, 
        useNullAsDefault: true, 
        migrations: {
            directory: './data/migrations',
            tableName: 'knex_migrations',
        },
        seeds: { directory: './data/seeds' },
    },
};
  