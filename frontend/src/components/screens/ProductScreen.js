import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../Rating'
import axios from 'axios'

const ProductScreen = ({ match }) => {

    const [product, setProduct] = useState([])

    useEffect(() => {
        
        const getProduct = async () => {
            const { data } = await axios.get(`/api/product/${match.params.id}`)
            console.log('in useEffect', data)
            setProduct(data)
        }
        console.log('in useEffect')
        getProduct()
    }, [match])

    return (
        <>
         <Link className='btn btn-dark my-3' to='/'>戻る</Link>
         <Row>
             <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
             </Col>
             <Col md={3}>
                 <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>{product.name}</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                       <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Descripion: {product.description}
                    </ListGroup.Item>
                 </ListGroup>
             </Col>
             <Col md={3}>
                 <Card>
                     <ListGroup variant='flush'>
                         <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                    <strong>{product.price}</strong>
                                </Col>
                            </Row>
                         </ListGroup.Item>
                         <ListGroup.Item>
                            <Row>
                                <Col>
                                    status:
                                </Col>
                                <Col>
                                    <strong>{product.countInStock > 0 ? '在庫あり' : '在庫なし'}</strong>
                                </Col>
                            </Row>
                         </ListGroup.Item>
                         <ListGroup.Item>
                             <Button className='btn-block' type='buttton' disabled={product.countInStock === 0}>カートに追加</Button>
                         </ListGroup.Item>
                     </ListGroup>
                 </Card>
             </Col>
         </Row>
        </>
    )
}

export default ProductScreen
