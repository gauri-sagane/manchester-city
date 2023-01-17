import React from 'react';
import Animation from './Animation';
import Enroll from './Enroll';

function Promotion(props) {
    return (
        <div className='promotion_wrapper'>
            <div className='container'>
                <Animation />
                <Enroll />
            </div>
        </div>
    );
}

export default Promotion;