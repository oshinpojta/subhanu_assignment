const client = require("../utils/database");
const table = "public.users"

exports.getUserById = async function(id){
    return new Promise((resolve, reject) => {
        client.query(`select * from ${table} where id=${id}`, (err, result)=>{
            if(err){
                reject(err);
            }
            if(result && result.rows.length>0){
                resolve(result.rows[0])
            }else{
                resolve(null);
            }
        })
    })
}

exports.getUserByUserName = async function(username){
    return new Promise((resolve, reject) => {
        client.query(`select * from ${table} where username='${username}'`, (err, result)=>{
            if(err){
                reject(err);
            }
            if(result && result.rows.length>0){
                resolve(result.rows[0])
            }else{
                resolve(null);
            }
        })
    })
}

exports.addUser = async function(username, email, password){
    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO ${table} (username, email, password)
                                        VALUES ('${username}', '${email}', '${password}') returning id`, (err, result)=>{
            if(err){
                reject(err);
            }
            if(result && result.rows.length>0){
                resolve(result.rows[0].id)
            }else{
                resolve(null);
            }
        })
    })
}