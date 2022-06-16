import React, {useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useSearchParams } from 'react-router-dom'

export default function RegisterScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [params] = useSearchParams()

    const disptach = useDispatch()
    const navigate = useNavigate()
    // const redirect = Location.search ? Location.search.split('=')[1] : '/' 
    const url = window.location.href
    const redirect = !params ? params.get('=') : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() =>{
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()

        if(password != confirmPassword){
            setMessage('Hasła nie są takie same!')
        }else{
            disptach(register(name, email, password))
        }
        
    }

  return (
    <FormContainer>
        <h1>Logowanie</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Imię: </Form.Label>
                <Form.Control
                    required
                    type='name'
                    placeholder='Wpisz imię '
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='wpisz email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Hasło: </Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Wpisz hasło'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Potwierdź hasło: </Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Potwierdź swoje hasło'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Zarejestruj</Button>

        </Form>
        <Row className='py-3'>
            <Col>
                Jesteś już zarejestrowany ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Zaloguj się</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}
