const express = require("express");
const path = require("path");

const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
let db = null;
const dbPath = path.join(__dirname, "sqldata.db");
 
const app = express();
app.use(express.json());

const initailizeDbServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        app.listen(3000,()=>{
            console.log(`Server Running at http://localhost:3000/`);
        })
         
    } catch (e) {
        console.log(`DB Error: ${e.message}`);  
        process.exit(1);
    }
}

initailizeDbServer(); 

app.get('/emplyee/',async (resquest,responce)=>{
    const emplyeeDetails = `
    SELECT * FROM  emplyee`
    const details = await db.all(emplyeeDetails)
    responce.send(details)
})

