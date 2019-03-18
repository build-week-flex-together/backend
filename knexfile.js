module.exports = {
    test: {
        client: 'sqlite3',
        connection: { filename: './data/test_db.db3' },
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations',
            tableName: 'knex_migrations',
        }
    },
    development: {
        client: 'sqlite3',
        connection: { filename: './data/dev_db.db3' },
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations',
            tableName: 'knex_migrations',
        }
    },
    production: {
        client: 'sqlite3',
        connection: { filename: process.env.DB_PATH },
        migrations: {
            directory: './data/migrations',
            tableName: 'knex_migrations',
        }
    }
};
