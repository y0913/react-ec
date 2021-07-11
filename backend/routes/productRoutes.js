import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProduct } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// 登録されている商品を全て取得
router.route('/').get(getProducts)
// 個別の商品データを取得
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct)

export default router
