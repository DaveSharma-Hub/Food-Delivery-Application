import pkg from 'pg';
const { Client } = pkg;
const connection = {
    "host": "localhost",
    "port": 5432,
    "database": "database",
    "user": "mainuser",
    "password": "summer1winter"
};
const DBClient = new Client(connection);
export default DBClient;
// class DBClient extends Client{
//     private client:any;
//     constructor(){
//         super(connection);
//     }
// }
// export default DBClient;
