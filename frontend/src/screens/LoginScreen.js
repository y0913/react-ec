import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // ログイン機能を実装する
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>ログイン</h1>
            {error && <Message variant='danger'>{error} </Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>メールアドレス</Form.Label>
                    <Form.Control type='email' placeholder='メールアドレス' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>パスワード</Form.Label>
                    <Form.Control type='password' placeholder='パスワード' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>ログイン</Button>
            </Form>
            <Row>
                <Col>
                    <Link to={redirect ? `register?redirect=${redirect}` : '/register' }>新規登録</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
