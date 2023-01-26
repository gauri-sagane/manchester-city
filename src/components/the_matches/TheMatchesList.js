import React from 'react';
//import { easePolyOut } from 'd3-ease';
//import { NodeGroup } from 'react-move';

function TheMatchesList(props) {

    // const showMatches = () => (
    //     props.matches ? 
    //     <NodeGroup data={props.matches} keyAccessor={(data)=>data.id} start={(data, i)=>({
    //         opacity: 0,
    //         x:-200
    //     })} enter={(data,i)=>({
    //         opacity: [1],
    //         x: [0],
    //         timing: {
    //             duration: 500,
    //             delay: i*50,
    //             ease: easePolyOut
    //         }
    //     })} update={(data,i)=>({
    //         opacity: [1],
    //         x: [0],
    //         timing: {
    //             duration: 500,
    //             delay: i*50,
    //             ease: easePolyOut
    //         }
    //     })} leave={(data,i)=>({
    //         opacity: [0],
    //         x: [-200],
    //         timing: {
    //             duration: 500,
    //             delay: i*50,
    //             ease: easePolyOut
    //         }
    //     })}>
    //         {(nodes) => (
    //             <div>
    //                 { nodes.map(({key, data, state})=>{
    //                     return <div key={key} className="match_box_big" style={{
    //                         ...state,
    //                         opacity: state.opacity,
    //                         transform: `translate(${state.x}px)`
    //                     }}>
    //                         <div className='block_wraper'>
    //                             <div className='block'>
    //                                 <div className='icon' style={{ background: `url(/images/team_icons/${data.localThmb}.png)`}}></div>
    //                                 <div className='team'>{data.local}</div>
    //                                 <div className='result'>{data.resultLocal}</div>
    //                             </div>
    //                             <div className='block'>
    //                                 <div className='icon' style={{ background: `url(/images/team_icons/${data.awayThmb}.png)`}}></div>
    //                                 <div className='team'>{data.away}</div>
    //                                 <div className='result'>{data.resultAway}</div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 })}
    //             </div>
    //         )}
    //     </NodeGroup>
    //     : null
    // )

    const showMatches1 = () => (
        props.matches ? 
        props.matches.map((match, i) => {
            return <div key={i} className="match_box_big">
                <div className='block_wraper'>
                    <div className='block'>
                        <div className='icon' style={{ background: `url(/images/team_icons/${match.localThmb}.png)`}}></div>
                        <div className='team'>{match.local}</div>
                        <div className='result'>{match.resultLocal}</div>
                    </div>
                    <div className='block'>
                        <div className='icon' style={{ background: `url(/images/team_icons/${match.awayThmb}.png)`}}></div>
                        <div className='team'>{match.away}</div>
                        <div className='result'>{match.resultAway}</div>
                    </div>
                </div>
                <div className='block_wraper nfo'>
                    <div><strong>Date: </strong>{match.date}</div>
                    <div><strong>Stadium: </strong>{match.stadium}</div>
                    <div><strong>Referee: </strong>{match.rferee}</div>
                </div>
            </div>
        })
        : null
    )

    return (
        <div>
            { showMatches1() }
        </div>
    );
}

export default TheMatchesList;