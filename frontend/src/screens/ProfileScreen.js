import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register, getUserDetails, updateUserProfileDetails } from '../actions/userActions'

const ProfileScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/')
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('パスワードが一致しません')
        } else {
            // ユーザプロフィールを更新
            dispatch(updateUserProfileDetails({ id: user._id, name, email, password }))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>ユーザプロフィール</h2>
                {message && <Message variant='danger'>{message} </Message>}
                {error && <Message variant='danger'>{error} </Message>}
                {success && <Message variant='success'>更新が正常に行われました</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>お名前</Form.Label>
                        <Form.Control type='name' placeholder='お名前' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='email'>
                        <Form.Label>メールアドレス</Form.Label>
                        <Form.Control type='email' placeholder='メールアドレス' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>パスワード</Form.Label>
                        <Form.Control type='password' placeholder='パスワード' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>パスワード</Form.Label>
                        <Form.Control type='password' placeholder='確認用パスワード' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>更新する</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>注文履歴</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
