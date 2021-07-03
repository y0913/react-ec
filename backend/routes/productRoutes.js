import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

// 登録されている商品を全て取得
router.get('/', asyncHandler(async (req,res) => {
    const products = await Product.find({})
    res.json(products)
}))

// 個別の商品データを取得
router.get('/:id', asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
    
}))

export default router