const db = require("../config/db");

module.exports = {
    save: (data) => {
        return new Promise((resolve,reject) => {
            const { email,username,password } = data;
            bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    const body = {...data, email: email.toLowerCase(), password: hash, position_id: 5};
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

    create: (data) => {
        return new Promise((resolve,reject) => {
            db.query('INSERT INTO users SET ?', data, (err, result) => {
                if(!err){
                    resolve(result);
                }else{
                    reject(err.message);
                }
            })
        })
    },

    findByEmail: (email) => {
        return new Promise((resolve,reject) => {
            const query = `SELECT 
            users.id, users.email, users.password, p.name as position, p.roles_id as roles
            FROM users
            INNER JOIN position as p ON users.position_id = p.id
            WHERE users.email = '${email}' LIMIT 1`;
            db.query(query, (err,result) => {
                if(!result){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    },

    findById: (id) => {
        return new Promise((resolve,reject) => {
            const query = `SELECT 
            users.id, users.email, users.password, p.name as position, p.roles_id as roles
            FROM users
            INNER JOIN position as p ON users.position_id = p.id
            WHERE users.id = ${id}`;
            db.query(query,(err,result) => {
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err.message));
                }
            })
        })
    }
}