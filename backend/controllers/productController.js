import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: '商品が削除されました' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'sample',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        category: 'sample',
        countInStock: 0,
        numReviews: 0,
        description: 'this is a sample product'
    })
    const createProduct = await product.save()
    res.json(createProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {

        product.name         = name
        product.price        = price
        product.description  = description
        product.image        = image
        product.brand        = brand
        product.category     = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }


})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
}