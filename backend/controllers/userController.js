import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

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
            token: null
        })
    } else {
        res.status(401)
        throw new Error('無効なパスワードです。')
    }
})

export { authUser }