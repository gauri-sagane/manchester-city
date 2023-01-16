import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Tag } from '../../utils/Tools';
import Cards from './Cards';

function MeetPlayers(props) {

    const [show, setShow] = useState(false)

    let tagDefault = {
        bck: '#0e1731',
        size: '100px',
        color: '#ffffff'
    }

    const showTextTag = (text) => (
        <Tag {...tagDefault} add={{
            display: 'inline-block',
            marginBottom: '20px'
        }}>
            {text}

        </Tag>
    )

    return (
        <Fade triggerOnce onVisibilityChange={(inView)=>{
            if(inView) {
                setShow(true)
            }
        }}>
            <div className='home_meetplayers'>
                <div className='container'>
                    <div className='home_meetplayers_wrapper'>
                        <div className='home_card_wrapper'>
                            <Cards show={show}/>
                        </div>
                        <div className='home_text_wrapper'>
                            <div>{showTextTag('Meet')}</div>
                            <div>{showTextTag('The')}</div>
                            <div>{showTextTag('Players')}</div>
                            <div>
                                <Tag bck='#ffffff' size='27px' color='#0e1731' link={true} linkTo="the_team" add={{
                                    display: 'inline-block',
                                    marginBottom: '27px',
                                    border: '1px solid #0e1731'
                                }}>
                                    Meet Them Here
                                </Tag>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
}

export default MeetPlayers;