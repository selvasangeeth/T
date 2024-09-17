const jwt =  require("jsonwebtoken");
require('dotenv').config();


const authMiddleware =(req,res,next)=>{
    const token = req.cookies.jwt;
         if(token){
          try
          {
                  const decoded = jwt.verify(token,process.env.SECRET_KEY);
                  req.user = decoded;
                  next();
          }
          catch(error){
            console.log("Error in auth middleware",error);
            res.status(401).json({message:"Authentication failed"});
          }
        }
        else{
            res.status(401).json({message:"You are not authenticated"});
        }
}
module.exports =authMiddleware;
