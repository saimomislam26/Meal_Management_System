const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const router = express.Router();
const app = express();
const  { User} = require('../model/user')
const auth = require('../Middleware/authorization')

app.use(cookieParser())

//User Signup 
const signUp = async(req,res) => {
    const {name,password} =req.body

    //All fields must be filled checking
    //same email login checking
    //password and confirm password match checking
    if(!name||!password) return res.status(400).json({message:"Fill all the fields"})

    var user = await User.findOne({name:name})
    if(user) return res.status(400).json({message:"User is already exist"})

    //if all checking is ok then register the user to the database
    user = new User({name,password})
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const confirmUser = await user.save()

    return res.status(200).send({
        data:_.pick(confirmUser,['name'])
    })
}

//user Login
const signIn = async (req,res)=>{
    const { name, password } = req.body
    console.log("Req Body",req.body);
    if (!name || !password) return res.status(400).json({ message: "fill the empty field" });
    const user = await User.findOne({ name: req.body.name })
    if (!user) return res.status(400).json({ message: "User name or password is incorrect" });
    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) return res.status(400).json({ message: "User name or password is incorrect" });

    const token = user.generateJWT();

    // res.cookie("jwtoken", token, {
    //     expires: new Date(Date.now() + 25892000000)
    // });
    const cookie = `jwtoken=${token};samesite=none;`
    res.setHeader('set-cookie',[cookie]);
    const result = await user.save();

    res.status(200).send({
        token: token,
        data: _.pick(result, ['name','_id'])
    })
}

const sendUser = async(req,res)=>{
    const user = await User.find()
    res.status(200).send(user)
}

//Getting Authenticate login user info
const getAuthData = async(req,res)=>{
    // console.log(req.rootUser);
    return res.status(200).send(req.data)
}

router.route('/userSignup')
    .post(signUp)
router.route('/userSignin')
    .post(signIn)
router.route('/getuser')
    .get(auth,sendUser)
router.route('/protecteddata')
    .get(auth,getAuthData)

module.exports = router