import React, {useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { useSearchParams } from 'react-router-dom'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import {listMyOrders} from '../actions/orderActions'

export default function ProfileScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [params] = useSearchParams()

    const disptach = useDispatch()
    const navigate = useNavigate()

    const url = window.location.href
    // const redirect = !params ? params.get('=') : '/'

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders, error:errorOrders, orders} = orderListMy

    useEffect(() =>{
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name || success){
                disptach({type: USER_UPDATE_PROFILE_RESET})
                disptach(getUserDetails('profile'))
                disptach(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [disptach, navigate, userInfo, user, success])

    const submitHandler = (e) =>{
        e.preventDefault()

        if(password != confirmPassword){
            setMessage('Hasła nie są takie same!')
        }else{
            disptach(updateUserProfile({'id': user.id, 'name': name, 'email': email, 'password': password}))
            setMessage('')
        }

        
    }

  return (
    <Row>
        <Col md={3}>
            <h2>Profil użytkownika</h2>

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
                        type='password'
                        placeholder='Potwierdź swoje hasło'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Aktualizuj</Button>

            </Form>
        </Col>
        <Col md={9}>
            <h2>Moje zamówienia</h2>
            {loadingOrders ? (
                <Loader />

            ): errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
            ):(
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Cena</th>
                            <th>Opłacone</th>
                            <th>Dostarczone</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order =>(
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice} zł</td>
                                <td>{order.isPaid ? order.paidAt : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order.id}`}>
                                        <Button className='btn-sm'>Szczegóły</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </Table>
            )
            }
        </Col>
        
    </Row>
  )
}
