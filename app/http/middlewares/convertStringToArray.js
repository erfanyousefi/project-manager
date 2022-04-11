module.exports.addStrToArr = (field) => {
    return function(req, res, next) {
        if(typeof req.body[field] == "string") {
            req.body[field] = [req.body[field]]
        }else if(!req.body[field]){
            req.body[field] = []
        }
        next()
    }
}