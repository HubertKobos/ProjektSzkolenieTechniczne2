import React, {useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useSearchParams } from 'react-router-dom'
import {saveShippingAddress} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions'

export default function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>

        <Form onSubmit={submitHandler}>

            <Form.Group>
                <Form.Label as='legend'>
                    Wybierz metodę płatności
                    <Col>
                        <Form.Check type='radio' label='PayPal lub płatność kartą' id='paypal' name='paymentMethod' checked onChange={(e) => setPaymentMethod(e.target.value)}>

                        </Form.Check>
                    </Col>
                </Form.Label>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Kontynuuj
            </Button>
        </Form>
    </FormContainer>
  )
}
