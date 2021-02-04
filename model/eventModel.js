const db = require("../config/db");
const _ = require('lodash');

module.exports = {
    save: (data) => {
        return new Promise((resolve,reject) => {
            db.query('INSERT INTO events SET ?', data, (err, result) => {
                if(!err){
                    resolve(result)
                }else{
                    reject(err);
                }
            })
        })
    },

    findById: (id) => {
        return new Promise((resolve,reject) => {
            const query = `SELECT events.*, u.email as usermail FROM events
            INNER JOIN users as u ON events.userId = u.id
            WHERE events.id = ${id} LIMIT 1`;
            db.query(query,(err,result) => {
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    }
}