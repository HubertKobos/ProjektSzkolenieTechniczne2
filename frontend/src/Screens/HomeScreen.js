import React, { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import axios from 'axios'

import Product from '../components/Product'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    useEffect(() =>{
        dispatch(listProducts())

    }, [dispatch])

  return (
    <div>
        <h1>Produkty, które oferujemy</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
        <Row>
            {products.map(product => {
                return(
                    <Col key={product.id} sm={12} md={6} lg={3.5} xl={4}>
                        <Product product={product}/>
                    </Col>
                )
            })}
        </Row>
        }
    </div>
  )
}

export default HomeScreen
