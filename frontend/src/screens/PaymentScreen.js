import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submit')
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>支払い方法</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>支払い方法を選択してください</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio' checked
                            label='PayPal or Crefit Card'
                            id='PayPal'
                            value='PayPal'
                            name='paymentMethod'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        {/* <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            value='Stripe'
                            name='paymentMethod'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>次へ</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
