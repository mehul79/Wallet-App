

const { JWT_SECRET } = require("./config")
const jwt = require("jsonwebtoken")

function authMiddleware(req,res,next){

    const totaltoken = req.headers.authorization;
    const tokenbreak = totaltoken.split(" ")

    
    if(!tokenbreak || tokenbreak[0]!="Bearer"){
        return res.status(403).json({});
    }
    const token = tokenbreak[1]
    console.log("token identified");

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId
        next()

    }catch(err){
        res.status(403).json({
            msg: `error, ${err}`,
            token: tokenbreak
        })
    }
    

}

module.exports = {
    authMiddleware
}