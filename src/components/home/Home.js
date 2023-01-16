import React from 'react';
import Featured from './featured/Featured';
import Matches from './matches/Matches';
import MeetPlayers from './meet_players/MeetPlayers';

function Home(props) {
    return (
        <div className='bck_blue'>
            <Featured />
            <Matches />
            <MeetPlayers />
        </div>
    );
}

export default Home;