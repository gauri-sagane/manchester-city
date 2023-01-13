import React from 'react';
import { Routes } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header_footer/Header';
import Footer from './components/header_footer/Footer';
import Home from './components/home/Home';
import SignIn from './components/signin/Signin';

const RoutesMain = ({user}) => {
  //console.log(props);
  return(
    <BrowserRouter>
    <Header user={user}/>
      <Routes>
        <Route path="/sign_in" exact element = {<SignIn />} />
        <Route path="/" exact element = {<Home />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  )
}

export default RoutesMain;
