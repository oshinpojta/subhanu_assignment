const userServices = require("../services/user-services");
const postServices = require("../services/post-services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

exports.loginUser = async function(req, res, next){
    try {
        let body = req.body;
        // console.log(body);
        let username = body.username;
        let password = body.password;
        let user = await userServices.getUserByUserName(username);
        let user_passwordHash = user.password;
        let check = await bcrypt.compare(password, user_passwordHash);
        if(!check){ // password doesn't match with hash
            res.json({ success : false, msg : "Password doesn't match with the username!"});
            return;
        }

        let token = jwt.sign({ user_id : user.id }, process.env.JWT_SECRET, { expiresIn : "1d" }); // expires in 1 day
        let data = {
            "token" : token
        }

        res.json({ success : true, data : data});
 
    } catch (error) {
        console.log("Internal Server Error : ", error);
        res.json({ success : false, msg : "Internal Server Error!"});
    }
}

exports.signupUser = async function(req, res, next){
    try {
        let body = req.body;
        // console.log(body);
        let username = body.username;
        let password = body.password;
        let email = body.email;
        let check_user = await userServices.getUserByUserName(username);
        if(check_user){
            res.json({ success : false, msg : "User with this username already present!"});
            return;
        }
        const salt = await bcrypt.genSalt(saltRounds);
        let passwordHash = await bcrypt.hash(password, salt);
        let user_id = await userServices.addUser(username, email, passwordHash);
        
        let user = await userServices.getUserById(user_id);

        let data = {
            id : user.id,
            username : user.username,
            email : user.email,
            created_at : user.created_at
        }

        res.json({ success : true, data : data});

    } catch (error) {
        console.log("Internal Server Error : ", error);
        res.json({ success : false, msg : "Internal Server Error!"});
    }
}

exports.getAllPostsByUser = async function(req, res, next){
    try {
        let user_id = req.user.id;
        let posts = await postServices.getAllPostsByUser(user_id);
        res.json({ success : true, data : posts});

    } catch (error) {
        console.log("Internal Server Error : ", error);
        res.json({ success : false, msg : "Internal Server Error!"});
    }
}

exports.createPost = async function(req, res, next){
    try {
        let body = req.body;
        let user_id = req.user.id;
        let title = body.title;
        let text = body.text;

        let id = await postServices.addPost(title, text, user_id);
        let post = await postServices.getPostById(id);
        res.json({ success : true, data : post});

    } catch (error) {
        console.log("Internal Server Error : ", error);
        res.json({ success : false, msg : "Internal Server Error!"});
    }
}

exports.updatePost = async function(req, res, next){
    try {
        let user_id = req.user.id;
        let body = req.body;
        let post_id = body.post_id;
        let title = body.title;
        let text = body.text;
        let post = await postServices.getPostById(post_id);
        console.log(body);
        // if post is not created by this user
        if(post.user_id != user_id){
            res.json({ success : false, msg : "you are not authorized to update the post! "});
            return;
        }

        await postServices.updatePost(post_id, title, text);
        post = await postServices.getPostById(post_id);
        res.json({ success : true, data : post});

    } catch (error) {
        console.log("Internal Server Error : ", error);
        res.json({ success : false, msg : "Internal Server Error!"});
    }
}