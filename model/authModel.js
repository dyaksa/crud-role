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
            
        })
    }
}