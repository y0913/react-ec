import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push(`/`)
        }
    }

    return (
        <div>
            <Form onSubmit={submitHandler} inline>
                <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} className='mr-sm-2 ml-sm-5' placeholder='例）Air Pods'></Form.Control>
                <Button type='submit' variant='outline-success' className='p-2'>検索する</Button>
            </Form>
        </div>
    )
}

export default SearchBox
