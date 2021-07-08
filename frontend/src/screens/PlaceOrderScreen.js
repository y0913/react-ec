import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const PlaceOrderScreen = () => {
    const cart = useSelector((state) => state.cart)

    const placeOrderHandler = () => {
        console.log('placeOrderHandler')
    }

    const addDecriminals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    // 値段計算のロジックを追加する
    cart.itemPrice = addDecriminals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    // 送料の計算
    cart.shippingPrice = addDecriminals(cart.itemPrice > 100 ? 0 : 100)
    // 税金の計算
    cart.taxPrice = addDecriminals(Number((0.1 * cart.itemPrice).toFixed(1)))
    // 合計額の計算
    cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <p>
                                <strong>住所:</strong>
                                {cart.shippingAddress.address}.{cart.shippingAddress.city} {' '}
                                {cart.shippingAddress.postalCode}, {' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>支払い方法</h2>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>商品</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>買い物かごが空です</Message>
                                ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map(item => (
                                        <ListGroup.Item key={item.product}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>注文情報</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>小計</Col>
                                    <Col>{cart.itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>送料</Col>
                                    <Col>{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>消費税</Col>
                                    <Col>{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>合計</Col>
                                    <Col>{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Button type='button' className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>注文する</Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>   
        </>
    )
}

export default PlaceOrderScreen
