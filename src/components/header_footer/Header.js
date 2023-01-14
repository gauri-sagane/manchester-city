import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CityLogo } from '../utils/Tools';
import '../../firebase';
//import { getAuth, signOut } from "firebase/auth";
import { logoutHandler } from '../utils/Tools';

function Header({user}) {

    // const auth = getAuth();
    // const logoutHandler = () => {
    //     signOut(auth).then(() => {
    //         // Sign-out successful.
            
    //         showToastSuccess('Signed out !! Good Bye !!')
    //       }).catch((error) => {
    //         // An error happened.
    //         showToastError(error.message)
    //       });
    // }

    return (
        <div>
            <AppBar position='fixed' style={{
                backgroundColor: "#98c5e9",
                boxShadow: "none",
                padding: '10px 0',
                borderBottom: '2px solid #00285e'
            }} >
                <Toolbar style={{ display: 'flex' }}>
                    <div style={{ flexGrow: 1 }}>
                        <div className='header_logo'>
                            <CityLogo link={true} linkto={'/'} width="70px" height="70px"/>
                        </div>
                    </div>

                    <Link to="/the_team"><Button color='inherit'>The Team</Button></Link>
                    <Link to="/the_matches"><Button color='inherit'>Matches</Button></Link>
                  
                    { user ? <><Button color='inherit' onClick={() => logoutHandler()}>Log Out</Button>
                            <Link to="/dashboard">
                                <Button color='inherit'>Dashboard</Button>
                            </Link>
                            </> : null }
                    
                 
                    
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;