const client = require("../utils/database");
const table = "public.posts"

exports.getPostById = async function(id){
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

exports.getAllPostsByUser = async function(user_id){
    return new Promise((resolve, reject) => {
        client.query(`select * from ${table} where user_id=${user_id} order by id desc`, (err, result)=>{
            if(err){
                reject(err);
            }
            if(result){
                resolve(result.rows)
            }else{
                resolve([]);
            }
        })
    })
}

exports.addPost = async function(title, text, user_id){
    return new Promise((resolve, reject) => {
        client.query(`INSERT INTO ${table} (title, text, user_id)
                                        VALUES ('${title}', '${text}', ${user_id}) returning id`, (err, result)=>{
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

exports.updatePost = async function(id, title, text){
    return new Promise((resolve, reject) => {
        client.query(`UPDATE ${table}
        SET title='${title}', text='${text}'
        WHERE id=${id}`, (err, result)=>{
            if(err){
                reject(err);
            }
            if(result){
                resolve(result.rows)
            }else{
                resolve(null);
            }
        })
    })
}