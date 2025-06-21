import knex from 'knex'
import path from 'path'
// console.log(process.env)

// const connection = knex ({
//         client : 'sqlite3',
//         connection :{
//             filename:path.resolve(__dirname,'database.sqlite'),
//         },
//         useNullAsDefault : true
// });

const connection = knex ({
    client : 'sqlite3',
    connection :{
        filename:path.resolve(__dirname,'database.sqlite')
    },
    useNullAsDefault : true
});

export default connection