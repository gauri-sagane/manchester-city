import React from 'react';
import { Routes } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header_footer/Header';
import Footer from './components/header_footer/Footer';
import Home from './components/home/Home';

const RoutesMain = () => {
  return(
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" exact element = {<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default RoutesMain;
