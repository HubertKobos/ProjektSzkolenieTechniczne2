import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./Screens/HomeScreen";

import {Container} from 'react-bootstrap'

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <main className="py-5">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen/>} exact/>
              <Route path="/login" element={<LoginScreen/>} />
              <Route path="/register" element={<RegisterScreen/>} />
              <Route path="/profile" element={<ProfileScreen/>} />
              <Route path="/shipping" element={<ShippingScreen/>} />
              <Route path="/placeorder" element={<PlaceOrderScreen/>} />
              <Route path="/order/:id" element={<OrderScreen/>} />
              <Route path="/payment" element={<PaymentScreen/>} />
              <Route path="/product/:id" element={<ProductScreen/>} exact/>
              <Route path="/cart/" element={<CartScreen />} />
              <Route path="/cart/:id" element={<CartScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>

  )
}

export default App