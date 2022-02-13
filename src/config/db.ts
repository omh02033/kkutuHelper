import { Knex, knex } from 'knex';

const knexConfig: Knex.Config = {
    client: "mysql",
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'kkutu',
        dateStrings: true
    },
};

export default knex(knexConfig);