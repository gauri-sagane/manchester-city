import React from 'react';
import { Tag } from '../../utils/Tools';
import Blocks from './Blocks';

function Matches(props) {
    return (
        <div className='home_matches_wrapper'>
            <div className='container'>
                <Tag bck='#0e1731' size='50px' color='#ffffff'>
                    Matches
                </Tag>
                <Blocks></Blocks>
                <Tag size='22px' color='#0e1731' link={true} linkTo='/the_team'>
                    Matches
                </Tag>  
            </div>
        </div>
    );
}

export default Matches;