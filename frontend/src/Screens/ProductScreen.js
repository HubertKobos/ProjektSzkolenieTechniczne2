import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, ListGroupItem, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
export default function ProductScreen() {
    const { id } = useParams() // dynamic params from URL
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // quantity 
    const [qty, setQty] = useState(1)

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(() =>{
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Wróć</Link>
            {loading ? 
                <Loader /> 
                : error 
                    ? <Message variant='danger'>{error}</Message> 
                :(
                    <Row>
                        <Col md={6}>
                            <Image src={require(`../resources/05.jpg`)} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h3>{product.name}</h3>
                                </ListGroupItem>

                                <ListGroupItem>
                                    <Rating value={product.rating} text={`${product.numReviews} opinie`} color={"#f8e825"} />
                                </ListGroupItem>

                                <ListGroupItem>
                                    Cena: {product.price} zł/t
                                </ListGroupItem>

                                <ListGroupItem>
                                    Opis: {product.description}
                                </ListGroupItem>

                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Cena: </Col>
                                                <Col>
                                                    <strong>zł{product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status: </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'Dostępny' : 'Wyprzedano'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Ilość:</Col>
                                                    <Col xs='auto' className='my-1'>
                                                        <Form.Control 
                                                            as="select"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {
                                                                // here is an array out of countInStock, if the countInStock is 3 then array will be [0, 1, 2]
                                                                [...Array(product.countInStock).keys()].map((x) =>(
                                                                    <option key={x+1} value={x+1}>
                                                                        {x+1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item className='text-center'>
                                            <Button className='btn-block ' disabled={product.countInStock == 0} type="button" onClick={addToCartHandler}>Dodaj do koszyka</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row> 
                )}
        </div>
    )
}
