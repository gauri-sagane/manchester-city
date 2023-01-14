import React, {useState} from 'react';
import { Animate } from 'react-move';
import { easePolyOut } from 'd3-ease';
import { Button } from '@mui/material';

function Test(props) {
    const [show, setShow] = useState(true)
    const [bck, setBck] = useState('#ffffff')

    return (
        <>
            <Button onClick={() => {
                setBck('#f44336')
            }}>
                Update
            </Button>
            <Button onClick={() => {
                setShow(false)
            }}>
                Remove
            </Button>
            <Button onClick={() => {
                setShow(true)
            }}>
                Show
            </Button>
            <Animate show={show} start={{
                backgroundColor: bck,
                width: 500,
                height: 500,
                opacity: 0
            }} enter={{
                backgroundColor: bck,
                width: [100],
                height: [100],
                opacity: [1],
                timing: {
                    duration: 1000,
                    delay: 1000,
                    ease: easePolyOut
                }
            }} update={{
                backgroundColor: bck,
                opacity: [0.5],
                timing: {
                    duration: 2000,
                    ease: easePolyOut
                }
            }} leave={[
                {
                    width:[1000],
                    timing: {
                        duration: 500,
                        ease: easePolyOut
                    }
                
                },
                {
                    opacity: [0],
                    timing: {
                        duration: 3000,
                        delay: 2000,
                        ease: easePolyOut
                    }
                
                }
            ]}>
                {({backgroundColor, width, height, opacity}) => (
                    <div style={{
                        backgroundColor,
                        width,
                        height,
                        opacity
                    }}>
                        hello
                    </div>
                )}
            </Animate>
        </>
    );
}

export default Test;