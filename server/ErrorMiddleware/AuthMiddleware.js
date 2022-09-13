const ApiError = require('../ApiError/ApiError')
const jwt = require('jsonwebtoken')

module.exports = function (req,res,next){
    if(req.method==="OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({"message":"No auth"})
        }
        const decoded = jwt.verify(token, process.env.secret_key)
        req.user = decoded
        console.log(req.user)
        next()
    }catch(err){
        return res.status(401).json({"message":"No auth"})
    }
}