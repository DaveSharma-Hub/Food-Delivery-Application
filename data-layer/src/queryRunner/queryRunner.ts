import DBClient from "../connection/client";
import fs from 'fs';
import fsPromise from 'fs/promises';

const fileName = process.argv[2];

async function main(){
    const client = new DBClient();
    try{
        if(fs.existsSync(fileName)){
            const query = await fsPromise.readFile(fileName,'utf-8');
            const res = await client.query(query);
            return res;
        }else{
            throw new Error('Incorrect file or file args');
        }
    }catch(e){
        throw e;
    }
}

const res = main();
console.log(res);