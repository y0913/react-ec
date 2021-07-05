import express from 'express'
const router = express.Router()
import { getProducts, getProductById } from '../controllers/productController.js'

// 登録されている商品を全て取得
router.route('/').get(getProducts)
// 個別の商品データを取得
router.route('/:id').get(getProductById)

export default router