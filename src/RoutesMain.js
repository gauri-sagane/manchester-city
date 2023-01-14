import React from 'react';
import { Routes } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header_footer/Header';
import Footer from './components/header_footer/Footer';
import Home from './components/home/Home';
import SignIn from './components/signin/Signin';
import Dashboard from './components/admin/Dashboard';
import AuthGuard from './hoc/AuthGuard';

const RoutesMain = (props) => {
  //console.log(props);
  return(
    <BrowserRouter>
    <Header user={props.user}/>
      <Routes>
        <Route path="/dashboard" exact element = {AuthGuard(Dashboard, props)} />
        <Route path="/sign_in" exact element = { <SignIn user={props.user}/>} />
        <Route path="/" exact element = {<Home />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  )
}

export default RoutesMain;
