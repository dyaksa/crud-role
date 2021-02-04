module.exports = {
    responseData: (data) => {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            created: {
                email: data.usermail
            }
        }
    }
}