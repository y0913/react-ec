import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submit')
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <h1>shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>住所</Form.Label>
                    <Form.Control type='text' placeholder='住所' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>市区町村</Form.Label>
                    <Form.Control type='text' placeholder='市区町村' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>郵便番号</Form.Label>
                    <Form.Control type='text' placeholder='郵便番号' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>国</Form.Label>
                    <Form.Control type='text' placeholder='国' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>次へ</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
