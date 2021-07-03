import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products'

const HomeScreen = () => {
    return (
        <>
            <h1>latest products</h1>
            <Row>
                {products.map(product => (
                    <Col>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
