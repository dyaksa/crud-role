module.exports = {
    getEvents: async (req,res) => {
        try {
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'success'
            });
        }catch(err){
            return res.status(200).send({
                status: 200,
                message: 'success'
            })
        }
    }
}