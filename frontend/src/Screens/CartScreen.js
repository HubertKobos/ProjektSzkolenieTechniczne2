import React, {useEffect} from 'react'
import {useSearchParams, Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { addToCart, removeFromCart } from '../actions/cartActions'
import { ListGroup, Row, Col, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'

export default function CartScreen() {

  const [_qty] = useSearchParams()
  const navigate = useNavigate()
  const disptach = useDispatch()

  const url = window.location.href  
  const productId = url.split('/cart/')[1] ? url.split('/cart/')[1].charAt(0) : false
  const qty = Number(_qty.get('qty'))
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  useEffect(() =>{
    if(productId){
      disptach(addToCart(productId, qty))
    }
  }, [disptach, productId, qty])

  const removeFromCartHandler = (id) =>{
    disptach(removeFromCart(id))
  }

  const checkoutHandler = () =>{
    // if the user is authenticated then to shipping else to login 
    // navigate('/login?redirect=shipping')
    navigate('/shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Koszyk</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Twój koszyk jest pusty <Link to='/'>Wróć</Link>
          </Message>
        ) :(
          <ListGroup variant='flush'>
            {cartItems.map(item =>(
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col>
                    {item.price}zł
                  </Col>

                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => disptach(addToCart(item.product, Number(e.target.value)))}
                    >
                      {
                        [...Array(item.countInStock).keys()].map((x) =>(
                          <option key={x+1} value={x+1}>
                            {x+1}
                          </option>
                        ))
                      }
                    </Form.Control>
                  </Col>
                      
                  <Col md={1}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Podsumowanie ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h3>
              Do zapłacenia: {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}zł
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Przejdź do płatności
              </Button>
            </ListGroup.Item>

          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}
