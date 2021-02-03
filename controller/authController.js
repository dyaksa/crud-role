const authModel = require("../model/authModel");
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req,res) => {
        try{
            const data = req.body;
            const regist = await authModel.register(data);
            if(regist.affectedRows){
                return res.status(201).send({
                    status: 200,
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
            const data = req.body;
            const user = await authModel.login(data);
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                position: user.position,
                roles: user.roles
            },process.env.JWT_SECRET_KEY);
            return res.status(200).send({
                status: 200,
                success: true,
                accessToken: token,
            })
        }catch(err){
            return res.status(500).send({
                status: 500,
                success: false,
                message: `internal server error`,
                error: {
                    status: true,
                    message: err.message
                }
            })
        }
    }
}