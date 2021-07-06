import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc  ユーザ認証とトークン取得
// @route POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // res.send({email, password})
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('無効なパスワードです。')
    }
})

// @desc  新規ユーザ作成
// @route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // res.send({email, password})
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('無効なパスワードです。')
    }
})

// @desc  ユーザ情報を取得
// @route GET /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id)
    
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export { authUser, getUserProfile }