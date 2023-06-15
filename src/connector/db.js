const sqlite = require ('sqlite3').verbose();
const path =require('path');
const dbpath=path.resolve(__dirname,'../../','employees.sqlite');

// console.log(dbpath);
 const appDatabase= new sqlite.Database(
    dbpath,
    sqlite.OPEN_READWRITE,
    err=>{
        if(err){
            return console.log("error connecting to database:: ", err);
        }
        return console.log("app connected to the database");
    }
 )

//  appDatabase.get(
//     'SELECT * FROM EMPLOYEES WHERE ID = ?',
//     [4],
//    (err,rows)=>{
//     if(err){
//         return console.log(err);
//     }
//      return console.log(rows);
//    }
//  )
module.exports = {appDatabase};