import Header from "./component/layout/header/Header.js"
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import './App.css';
import WebFont from "webfontloader"
import React from "react";
import Footer from "./component/layout/footer/Footer.js";
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/product/ProductDetails.js";
import Products from './component/product/Products.js'
import Search from './component/product/Search.js'
import LoginSignUp from "./component/user/LoginSignUp.js";
import Profile from "./component/user/Profile.js";
import Store from './Store'
import { loadUser } from './actions/userActions.js'
import UserOptions from './component/layout/header/UserOptions.js'
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/route/ProtectedRoute.js";
import UpdateProfile from './component/user/UpdateProfile.js'
import UpdatePassword from './component/user/UpdatePassword.js'
import ForgotPassword from './component/user/ForgotPassword.js'
import ResetPassword from './component/user/ResetPassword.js'
import Cart from './component/cart/Cart.js'
function App() {
  const {isAuthenticated, user}=useSelector((state)=>state.user)
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"],
      },
    });
    Store.dispatch(loadUser());
  },[]);

  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}

      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/product/:id" element={<ProductDetails/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route exact path="/products/:keyword" element={<Products/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route exact path="/login" element={<LoginSignUp/>}/>
        <Route
        exact
            path="/account"
            element={
              <ProtectedRoute isSignedIn={isAuthenticated} user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />
        <Route
        exact
            path="/me/update"
            element={
              <ProtectedRoute isSignedIn={isAuthenticated} user={user}>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
        <Route
        exact
            path="/password/update"
            element={
              <ProtectedRoute isSignedIn={isAuthenticated} user={user}>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
        <Route
        exact
            path="/password/forgot"
            element={
              <ForgotPassword />
            }
          />
        <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
        <Route exact path="/cart" element={<Cart/>} />
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;
