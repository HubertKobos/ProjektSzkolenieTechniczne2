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

export default function ShippingScreen() {
    
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalcode, setpostalcode] = useState(shippingAddress.postalcode)
    const [country, setcountry] = useState(shippingAddress.country)

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalcode, country}))
        navigate('/payment')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Zamówienie</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Adres: </Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Wpisz adres '
                    value={address ? address : ''}
                    onChange={(e) => setAddress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>Miasto: </Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Wpisz miasto '
                    value={city ? city : ''}
                    onChange={(e) => setCity(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalcode'>
                <Form.Label>Kod pocztowy: </Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Wpisz kod pocztowy '
                    value={postalcode ? postalcode : ''}
                    onChange={(e) => setpostalcode(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Kraj: </Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Wpisz kraj '
                    value={country ? country : ''}
                    onChange={(e) => setcountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Dalej
            </Button>
        </Form>
    </FormContainer>
  )
}
