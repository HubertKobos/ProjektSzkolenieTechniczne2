import React, {useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useSearchParams } from 'react-router-dom'
import {saveShippingAddress} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import {Image} from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

export default function PlaceOrderScreen() {

    const orderCreate = useSelector(state =>state.orderCreate)
    const {order, error, success} = orderCreate

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 2000 ? 0 : 50).toFixed(2)
    cart.taxPrice = Number((0.23) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    if(!cart.paymentMethod){
        navigate('/payment')
    }

    useEffect(() =>{
        if(success){
            navigate(`/order/${order.id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [success, navigate])

    const placeOrder = () =>{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4/>    
        <Row md={8}>
            <Col>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Wysy??ka</h2>
                        <p>
                            <strong>Wysy??ka: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}
                            {'   '}
                            {cart.shippingAddress.postalcode},
                            {'   '}
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Metoda p??atno??ci</h2>
                        <p>
                            <strong>Metoda p??atno??ci: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Koszyk</h2>
                            <strong>Koszyk: </strong>
                            {cart.cartItems.length === 0 ? <Message variant='info'>Koszyk jest pusty</Message> :
                            (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) =>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}> 
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X {item.price}z?? = {(item.qty * item.price).toFixed(2)}z??
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}       
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Podsumowanie zam??wienia</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Towary: </Col>
                                <Col>{cart.itemsPrice}z??</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Dostawa: </Col>
                                <Col>{cart.shippingPrice}z??</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Podatek: </Col>
                                <Col>{cart.taxPrice}z??</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Razem: </Col>
                                <Col>{cart.totalPrice}z??</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error.message}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrder}>
                                Z?????? zam??wienie
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}
