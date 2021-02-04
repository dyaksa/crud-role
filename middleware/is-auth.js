const jwt = require("jsonwebtoken");
const authModel = require("../model/authModel");

module.exports = {
    verifyToken: (req,res,next) => {
        const tokenHeader = req.headers['authorization'];
        if(!tokenHeader){
            return res.status(403).send({
                status: 403,
                auth: false,
                message: 'error',
                errors: 'no token provider'
            })
        }

        const accessToken = req.headers['authorization'].split(' ')[1];
        if(!accessToken || accessToken === ''){
            return res.status(403).send({
                status: 403,
                auth: false,
                message: 'error',
                errors: 'no token provider'
            })
        }

        jwt.verify(accessToken, process.env.JWT_SECRET_KEY,(err,decoded) => {
            if(err){
                return res.status(500).send({
                    status: 500,
                    auth: false,
                    message: 'error',
                    errors: err
                })
            }
            req.userId = decoded.id
            req.userEmail = decoded.email
            next();
        })
    },

    isSuperAdmin: (req,res,next) => {
        authModel.findById(req.userId)
        .then(user => {
            if(user[0].roles !== 1){
                return res.status(403).send({
                    status: 403,
                    auth: true,
                    message: 'error',
                    errors: 'requires a super admin role'
                })
            }
            return next();
        }).catch(err => {
            return res.status(500).send({
                status: 500,
                auth: false,
                message: 'error',
                errors: err.message
            })
        })
    }
}