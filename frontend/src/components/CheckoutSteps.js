import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>ログインする</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>ログインする</Nav.Link>}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>住所を入力する</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>住所を入力する</Nav.Link>}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>支払い方法を入力する</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>支払い方法を入力する</Nav.Link>}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>注文する</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>注文する</Nav.Link>}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
