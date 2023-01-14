import React from 'react';
import { Animate } from 'react-move';
import { easePolyOut } from 'd3-ease';

let stripesState = [
    {
        id: 10001,
        background: '#98c5e9',
        left: 120,
        rotate: 25,
        top: -260,
        delay: 0
    },
    {
        id: 10002,
        background: '#ffffff',
        left: 360,
        rotate: 25,
        top: -394,
        delay: 300
    },
    {
        id: 10003,
        background: '#98c5e9',
        left: 600,
        rotate: 25,
        top: -498,
        delay: 500
    }
];

function Stripes(props) {

    const handleShowStripe = () => (
        stripesState.map((stripe) => (
            <Animate key={stripe.id} show={true} start={{
                background: '#ffffff',
                opacity: 0,
                left: 0,
                rotate: 0,
                top: 0,
            }} enter={{
                background: `${stripe.background}`,
                opacity: [1],
                left: [stripe.left],
                rotate: [stripe.rotate],
                top: [stripe.top],
                timing: {
                    delay: stripe.delay,
                    duration: 200,
                    ease: easePolyOut
                }
            }}>
                {({background, opacity, left, rotate, top}) => (
                    <div className='stripe' style={{
                        background,
                        opacity,
                        transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`
                    }}></div>
                )}
            </Animate>
        ))
    )

    return (
        <div className='featured_stripes'>
            {handleShowStripe()}
        </div>
    );
}

export default Stripes;