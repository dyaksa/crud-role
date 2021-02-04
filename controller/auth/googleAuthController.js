const jwt = require('jsonwebtoken');
const authModel = require('../../model/authModel');

module.exports = {
    callback: async (req,res) => {
        try {
            const user = await authModel.findById(req.user[0].id);
            const token = jwt.sign({
                id: user[0].id,
                email: user[0].email,
                position: user[0].position,
                roles: user[0].roles
            }, process.env.JWT_SECRET_KEY);
            return res.status(200).send({
                status: 200,
                auth: true,
                message: 'success',
                accessToken: token
            })
        }catch(err){
            return res.status(500).send({
                status: 200,
                auth: false,
                message: 'error',
                errors: err.message
            })
        }
    }
}