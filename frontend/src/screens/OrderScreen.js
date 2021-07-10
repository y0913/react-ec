import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({ match }) => {
    const orderId = match.params.id
    const dispatch = useDispatch()




    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    if (!loading) {
        const addDecriminals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        // 値段計算のロジックを追加する
        order.itemPrice = addDecriminals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() => {
        if (!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch,order , orderId])

    return loading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) : ( <>
            <h1>注文No. {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>配送先住所</h2>
                            <p>
                                <strong>お名前:</strong>{order.user.name}
                            </p>
                            <p>
                                <strong>メールアドレス:</strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>住所:</strong>
                                {order.shippingAddress.address}.{order.shippingAddress.city} {' '}
                                {order.shippingAddress.postalCode}, {' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? ( <Message variant='success'>支払い日時: {order.deliverAt}</Message> ) : ( <Message variant='danger'>配達がまだです</Message> )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>支払い方法</h2>
                            <p>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? ( <Message variant='success'>支払い日時: {order.paidAt}</Message> ) : ( <Message variant='danger'>支払いがまだです</Message> )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>商品</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>買い物かごが空です</Message>
                                ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map(item => (
                                        <ListGroup.Item key={item.product}>
                                            <Row>
                                                <Col md={4}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid rounded
                                                    />
                                                </Col>
                                                <Col md={4}>
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
                                    <Col>{order.itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>送料</Col>
                                    <Col>{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>消費税</Col>
                                    <Col>{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>合計</Col>
                                    <Col>{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>   
    </>
    )}

export default OrderScreen
