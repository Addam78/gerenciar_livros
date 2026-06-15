import type { Knex } from "knex";
import path from 'path'

// Update with your config settings.

module.exports ={
    client : 'sqlite3',
    connection :{
        filename:path.resolve(__dirname, 'src', 'database','database.sqlite'), //DATABASESQLITE DEFINE O NOME DO BANCO
    },
    migrations :{
        directory :path.resolve(__dirname, 'src', 'database','migrations')
    },
    seeds:{
        directory :path.resolve(__dirname, 'src', 'database','seeds')
    },
    UserNullAsDefault : true
};


