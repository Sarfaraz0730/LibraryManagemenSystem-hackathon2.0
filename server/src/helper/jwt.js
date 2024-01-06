const jwt =require('jsonwebtoken')
require('dotenv').config();



const verify =async(req,res,next)=>{
const token = req.header("Authorization").split(" ")[1];

if(!token){
    return res.status(401).json({ message: 'Unauthorized, No token provided' });
}
try{
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    //To pass the decoded data to the next middleware or route handler,
    req.decoded = decoded; 
 next()


}catch(err){
    return res.status(401).json({ message: 'Unauthorized, Invalid token' });
}

}

module.exports = verify