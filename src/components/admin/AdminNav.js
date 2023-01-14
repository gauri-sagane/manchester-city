import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '@mui/material';
import '../../firebase';
import { logoutHandler } from '../utils/Tools';

import { useLocation, useNavigate, useParams } from "react-router-dom";
  
function withRouter(AdminNav) {
function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
    <AdminNav
    
        {...props}
        router={{ location, navigate, params }}
    />
    
    );
}

return ComponentWithRouterProp;
}


function AdminNav(props) {
    
    const links =[
        {
            title: 'Matches',
            linkTO: '/admin_matches'
        },
        {
            title: 'Players',
            linkTO: '/admin_players'
        }
    ]

    const renderItems = () => (
        links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button className='admin_nav_link'>{link.title}</ListItem>
            </Link>
        ))
    )

    return (
        <div>
            {renderItems()}
            <ListItem button className='admin_nav_link' onClick={() => logoutHandler()}>Log Out</ListItem>
        </div>
    );
}

export default withRouter(AdminNav);