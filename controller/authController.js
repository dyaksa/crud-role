const authModel = require("../model/authModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req,res) => {
        try{
            const data = req.body;
            const regist = await authModel.save(data);
            if(regist.affectedRows){
                return res.status(201).send({
                    status: 201,
                    success: true,
                    message: 'success register user',
                    error: false,
                    data: {
                        id: regist.insertId,
                        email: data.email,
                        username: data.username
                    }
                });
            }
            return res.status(200).send({
                status: 200,
                success: false,
                message: 'register user failed',
                error: true,
                data: {}
            })
        }catch(err){
            return res.status(500).send({
                status: 500,
                success: false,
                message: 'internal server error',
                error: true
            })
        }
    },

    login: async (req,res) => {
        try {
            const {email,password} = req.body;
            const user = await authModel.findByEmail(email);
            if(!user){
                return res.status(403).send({
                    status: 403,
                    auth: false,
                    message: 'error',
                    errors: 'email not exists'
                })
            }
            const isValidatePassword = bcrypt.compareSync(password, user[0].password);
            if(!isValidatePassword){
                return res.status(403).send({
                    status: 403,
                    auth: false,
                    message: 'error',
                    errors: 'password not match'
                })
            }

            const token = jwt.sign({
                id: user[0].id,
                email: user[0].email,
                position: user[0].position,
                roles: user[0].roles
            },process.env.JWT_SECRET_KEY);

            return res.status(200).send({
                status: 200,
                auth: true,
                message: 'success',
                accessToken: token
            })
        }catch(err){
            return res.status(500).send({
                status: 500,
                success: false,
                message: `error`,
                errors: err.message
            })
        }
    },  
}