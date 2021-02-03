const db = require("../config/db");
const bcrypt = require("bcryptjs");

module.exports = {
    register: (data) => {
        return new Promise((resolve,reject) => {
            const { email,username,password } = data;
            bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    const body = {...data, email: email.toLowerCase(), password: hash, position_id: 4};
                    db.query('INSERT INTO users SET ?', body, (err, result) => {
                        if(!err){
                            resolve(result);
                        }else{
                            reject(err);
                        }
                    })
                })
            })
        })
    },

    login: (data) => {
        const { email,password } = data;
        return new Promise((resolve,reject) => {
            const query = `SELECT 
            users.id, users.username, users.email, users.password, p.name as position, p.roles_id as roles
            FROM users
            INNER JOIN position as p ON users.position_id = p.id
            WHERE email = '${email}'`;
            db.query(query, (err,result) => {
                if(result.length){
                    const passwordIsValid = bcrypt.compareSync(password, result[0].password);
                    if(passwordIsValid){
                        resolve(result[0]);
                    }else{
                        reject(new Error('password not match'));
                    }
                }else{
                    reject(new Error("email not exists"));
                }
            })
        })
    },

    findById: (id) => {
        return new Promise((resolve,reject) => {
            const query = `SELECT 
            users.id, users.username, users.email, users.password, p.name as position, p.roles_id as roles
            FROM users
            INNER JOIN position as p ON users.position_id = p.id
            WHERE users.id = '${id}'`;
            db.query(query,(err,result) => {
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error('id is not found'));
                }
            })
        })
    }
}