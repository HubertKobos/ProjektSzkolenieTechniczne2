import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

function Footer() {
  return (
    <div>
        <Container>
            <Row>
                <Col className='text-center'>Copyright &copy; Handel i Usługi Transportowe</Col>
            </Row>
        </Container>
    </div>
  )
}

export default Footer