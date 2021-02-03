module.exports = {
    getEvents: async (req,res) => {
        try {

        }catch(err){
            return res.status(200).send({
                status: 200,
                message: 'success'
            })
        }
    }
}