const authModel = require("../model/authModel");

module.exports = {
    postRegister: async (req,res) => {
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

    postLogin: async (req,res) => {
        try {
            const { email,password } = req.body;
        }catch(err){
            console.log(err);
        }
    }
}