const jwt = require("jsonwebtoken");
const userServices = require("../services/user-services");

exports.authenticateAndroidToken = async function(req, res, next){
    try {
        let headers = req.headers;
        let token = headers['token'];

        let obj = jwt.verify(token, process.env.JWT_SECRET); // jwt token will be used to verify user
        let user_id = obj.user_id;
        let user = await userServices.getUserById(user_id);
        // console.log(obj, user);
        // if user is present by verifying token then token is valid, Else token is invalid or expired
        if(user){  
            req.user = user;
        }else{
            throw "No User Found! Invalid Token or Expired.";
        }

        next(); // request will be moved to further funtions
    } catch (error) {
        console.log("JWT Token Error : ", error);
        res.json({ success : false, msg : "Token Error! Please Relogin"});
    }
}