import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Product from '../Product'
// import products from '../../products'

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        
        const getProducts = async () => {
            const { data } = await axios.get('/api/products')
            console.log('in useEffect', data)
            setProducts(data)
        }
        console.log('in useEffect')
        getProducts()
    }, [])
    return (
        <>
            <h1>latest products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
