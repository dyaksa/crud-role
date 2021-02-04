module.exports = {
    formData: (body) => {
        return Object.entries(body).map((item) => {
            return parseInt(item[0]) > 0
            ? `${item[0]} = ${item[1]}`
            : `${item[0]} = '${item[1]}'`
        })
    }
}