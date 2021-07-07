import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token
    console.log("------------------")
    console.log(req.headers.authrization)

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log(req.headers) 
        try {
            token = req.headers.authorization.split(' ')[1]
            console.log(req.headers)   
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)

            req.user = await User.findById(decoded.id).select('-password')
            console.log(req.user)
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized, token failed')
        }
    }
    console.log(token)
    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, no token')
    }

    // next()
})

export { protect }