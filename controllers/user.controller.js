import User from "../models/user.models.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const register = async (req,res) => {
   try {
    var newUser = new User(req.body)
    newUser.password = bcrypt.hashSync(req.body.password, 10)
    
    const userDb =await User.findOne({$or : [{email: req.body.email},{username: req.body.username}]}).exec();
    if(userDb!==null){
        return res.status(500).json({message: "User already exists!"})
    }else{
        const createUser = await newUser.save();
        if(!createUser){
            return res.status(400).send({message: err.message})
        }else{
            newUser.password = undefined
            return res.status(201).json(newUser)
        }
    }
   } catch (e) {
    console.log(e);
   }
}

export const sign_in = async (req,res) => {
   try {
    const userData = await User.findOne({email: req.body.email})
    if(userData!==null){
        bcrypt.compare(req.body.password, userData.password, (err, result) => {
            if(err){
                return res.status(401).json({message: "Authentication failed or Wrong password"})
            }
            if(result){
                const token = jwt.sign({
                        email: userData.email,
                        username: userData.username,
                        name: userData.name,
                        _id: userData._id
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "1h"
                    })

                    return res.status(200).json({
                        message: "Authentication Success",
                        token: token,
                        expire: "1 hour"
                    })
            }
        })
    }else{
        res.status(204).json({message: "User not found"})
    }
   } catch (e) {
    console.log(e)
   }
}

export const loginrequired = (req,res,next) => {
    
    if (req.user) {
        next();
    }else{
        return res.status(401).json({ message: "Unauthorized user!!" });
    }
}

export const profile = (req,res, next) => {
    if(req.user){
        res.send(req.user);
        next();
    }else{
        return res.status(401).json({message: "Invalid token"})
    }
}

export const logout = (req,res) => {
    try {
        
        res.status(200).json({ message: 'You are logged out!' });
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
    res.end();
}