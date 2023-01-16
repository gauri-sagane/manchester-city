import React from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import Raheem from '../../../Resources/images/players/Raheem_Sterling.png';
import Vincent from '../../../Resources/images/players/Vincent_Kompany.png';
import PlayerCard from '../../utils/PlayerCard';

let cardsState = [
    {
        id: 1000001,
        bottom: 90,
        left: 300,
        player: Vincent
    },
    {
        id: 1000002,
        bottom: 60,
        left: 200,
        player: Raheem
    },
    {
        id: 1000003,
        bottom: 30,
        left: 100,
        player: Otamendi
    },
    {
        id: 1000004,
        bottom: 0,
        left: 0,
        player: Vincent
    }
];

function Cards(props) {

    const showAnimateCards = () => (
        cardsState.map((card) => (
            <Animate key={card.id} show={props.show} start={{
                left:0,
                bottom: 0,
                player: card.player
            }} enter={{
                left: [card.left],
                bottom: [card.bottom],
                player: card.player,
                timing: {
                    delay: 500,
                    duration: 500,
                    ease: easePolyOut
                }
            }}>
                {({left, bottom, player}) => (
                    <div style={{
                        position: 'absolute',
                        left,
                        bottom
                        //background: `#f2f9ff url(${player})`
                    }}>
                        
                        <PlayerCard number="30" name="Nicholas" lastname="Otamendi" bck={player}/>
                    </div>
                )}
            </Animate>
        ))
    )

    return (
        <div>
            {showAnimateCards()}
        </div>
    );
}

export default Cards;