import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () =>{
        dispatch(logout())
    }

  return (
    <div>
        <Navbar bg="light" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand className='px-3'>Handel i Usługi Transportowe</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" >
                    <LinkContainer to="/">
                        <Nav.Link className="px-3">Strona Główna</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/cart">
                        <Nav.Link>Koszyk<i className="fa-solid fa-cart-shopping px-1"></i></Nav.Link>
                    </LinkContainer>
                    {/* <LinkContainer to="/contact">
                        <Nav.Link>Kontakt<i className="fa-solid fa-address-book px-1"></i></Nav.Link>
                    </LinkContainer> */}

                    {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profil</NavDropdown.Item>
                            </LinkContainer>

                            <NavDropdown.Item onClick={logoutHandler}>Wyloguj</NavDropdown.Item>
                        </NavDropdown>
                    ) :(
                            <LinkContainer to='/login'>
                                <Nav.Link><i className='fas fa-user px-1'></i>Zaloguj</Nav.Link>
                            </LinkContainer>
                    )}

                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default Header