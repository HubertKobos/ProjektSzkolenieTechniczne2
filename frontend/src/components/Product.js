import React from 'react'
import {Card, Button} from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'


// import asd from '../resources'
function Product({product}) {
  return (
    <Card style={{ width: '22rem', height: '30rem'}} className='my-3  rounded'>

        <Card.Body>
            <Link to={`/product/${product.id}`}>
                <Card.Img className='mb-3'src={product.image}/>
            </Link>
            <Link to={`/product/${product.id}`} style={{textDecoration: 'none'}}>
                <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
            </Link>
            <Card.Text>
                {product.description}
            </Card.Text>
            <Card.Text>
                Cena: {product.price} / t
            </Card.Text>
            <Card.Text as="div">
                <div className="my-3">
                  <Rating value={product.rating} text={`${product.numReviews} opinie`} color={"#f8e825"}/>
                </div>
            </Card.Text>
            <Button variant="primary" href={`/product/${product.id}`}>Zobacz</Button>
        </Card.Body>
    </Card> 
  )
}

export default Product