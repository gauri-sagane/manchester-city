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

import Players from './components/admin/players/Players';
import AddEditPlayers from './components/admin/players/AddEditPlayers';
import TheTeam from './components/the_team/TheTeam';
import MatchesList from './components/admin/matches_list/MatchesList';
import AddEditMatches from './components/admin/matches_list/AddEditMatches';
import TheMatches from './components/the_matches/TheMatches';
import NotFound from './components/NotFound';

const RoutesMain = (props) => {
  //console.log(props);
  return(
    <BrowserRouter>
    <Header user={props.user}/>
      <Routes>
        <Route path="/admin_matches/edit_match/:matchid" exact element = {AuthGuard(AddEditMatches)} />
        <Route path="/admin_matches/add_match" exact element = {AuthGuard(AddEditMatches)} />
        <Route path="/admin_matches" exact element = {AuthGuard(MatchesList)} />
        <Route path="/admin_players/edit_player/:playerid" exact element = {AuthGuard(AddEditPlayers)} />
        <Route path="/admin_players/add_player" exact element = {AuthGuard(AddEditPlayers)} />
        <Route path="/admin_players" exact element = {AuthGuard(Players)} />
        <Route path="/dashboard" exact element = {AuthGuard(Dashboard, props)} />
        <Route path="/the_matches" exact element = {<TheMatches />} />
        <Route path="/the_team" exact element = {<TheTeam />} />
        <Route path="/sign_in" exact element = { <SignIn user={props.user}/>} />
        <Route path="/" exact element = {<Home />} />
        <Route path="/*" element = {<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  )
}

export default RoutesMain;
