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
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'
import { useParams } from 'react-router-dom'
import {PayPalButton} from 'react-paypal-button-v2'
import {OREDER_PAY_RESET} from '../constants/orderConstants'

export default function OrderScreen() {

    const orderId = useParams()
    const dispatch = useDispatch()
    
    const[sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state =>state.orderDetails)
    const {order, error, loading} = orderDetails
    
    const orderPay = useSelector(state =>state.orderPay)
    const {loading:loadingPay, success:successPay} = orderPay
    

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    const addPayPalScript = () =>{
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = "https://www.paypal.com/sdk/js?client-id=AXD553RbLR7Xq_ETmyHpZ15sp_q9Z42TVurREtREpYlCNTfE7SXxrsa3Bp7J-8L8c2IRibaRZZb4ChX4"
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() =>{
        if(!order || successPay || !order.id === Number(orderId)){
            dispatch({type:ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId.id))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderId.id, successPay])

    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(orderId.id, paymentResult))
    }


  return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
            <div>
                <h1>Zamówienie: {order.id}</h1>
                <Row md={8}>
                    <Col>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Wysyłka</h2>
                                <p><strong>Imię: </strong>{order.user.name}</p>
                                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <p>
                                    <strong>Wysyłka: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}
                                    {'   '}
                                    {order.shippingAddress.postalcode},
                                    {'   '}
                                    {order.shippingAddress.country}
                                </p>

                                {order.isDelivered ? (
                                    <Message variant='success'>Dostarczone: {order.deliveredAt}</Message>
                                ) : (
                                    <Message variant='warning'>Niedostarczone</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Metoda płatności</h2>
                                <p>
                                    <strong>Metoda płatności: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <Message variant='success'>Opłacone: {order.paidAt}</Message>
                                ) : (
                                    <Message variant='warning'>Nieopłacone</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Koszyk</h2>
                                    <strong>Koszyk: </strong>
                                    {order.orderItems.length === 0 ? <Message variant='info'>Zamówienie jest puste</Message> :
                                    (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, index) =>(
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}> 
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>

                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </Col>

                                                        <Col md={4}>
                                                            {item.qty} X {item.price}zł = {(item.qty * item.price).toFixed(2)}zł
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
                                    <h2>Podsumowanie zamówienia</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Towary: </Col>
                                        <Col>{order.itemsPrice}zł</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Dostawa: </Col>
                                        <Col>{order.shippingPrice}zł</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Podatek: </Col>
                                        <Col>{order.taxPrice}zł</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Razem: </Col>
                                        <Col>{order.totalPrice}zł</Col>
                                    </Row>
                                    
                                </ListGroup.Item>

                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader/>}
                                        {!sdkReady ? (<Loader/>) : (
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />
                                        )}
                                    </ListGroup.Item>
                                )}

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
}
