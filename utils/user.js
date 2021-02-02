const db = require("../config/db");

module.exports = {
    findByEmail: (req,res,next) => {
        const { email } = req.body;
        db.query(`SELECT * FROM users WHERE email = '${email}'`,(err,result) => {
            if(result.length){
                return next();
            }
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'email cannot exists',
                error: true,
                data: {}
            })
        })
    }
}