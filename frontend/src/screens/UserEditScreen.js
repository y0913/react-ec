import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!user || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, history, user, userId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
    }

    return (
        <>
            <Link to={`/admin/userlist`} className='btn btn-light my-3'>
                戻る
            </Link>
            <FormContainer>
            <h1>ユーザ情報編集</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>お名前</Form.Label>
                    <Form.Control type='name' placeholder='お名前' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='email'>
                    <Form.Label>メールアドレス</Form.Label>
                    <Form.Control type='email' placeholder='メールアドレス' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='isadmin'>
                    <Form.Check type='checkbox' label='管理者' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                </Form.Group>

                <Button type='submit' variant='primary'>更新する</Button>
            </Form>
            )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen
