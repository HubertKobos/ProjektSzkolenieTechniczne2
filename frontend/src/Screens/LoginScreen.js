import React, {useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useSearchParams } from 'react-router-dom'


export default function LoginScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [params] = useSearchParams()

    const disptach = useDispatch()
    const navigate = useNavigate()
    // const redirect = Location.search ? Location.search.split('=')[1] : '/' 
    const url = window.location.href
    const redirect = !params ? params.get('=') : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() =>{
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        disptach(login(email, password))
    }

  return (
    <FormContainer>
        <h1>Logowanie</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Email: '
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Hasło: </Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Hasło: '
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Zaloguj</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Nie masz konta ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Zarejestruj się</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}
