import React from 'react';
import { CityLogo } from '../utils/Tools';

function Footer(props) {
    return (
        <footer className='bck_blue'>
            <div className='fooet_logo'>
                <CityLogo link={true} linkto={'/'} width="70px" height="70px"/>
            </div>
            <div className='footer_descl'>
                Manchester City 2023. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;