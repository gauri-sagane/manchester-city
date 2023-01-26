import React, { useState, useEffect, useReducer } from 'react';
import { showToastError } from '../utils/Tools';
import { CircularProgress } from '@mui/material';
import Tables from './Tables';
import TheMatchesList from './TheMatchesList';
import '../../firebase';
import { firestore } from '../../firebase';
import { getDocs, collection, query } from "firebase/firestore";

function TheMatches(props) {

    const [matches, setMatches] = useState(null);
    //const [matchId, setMatchId] = useState(null);
    const [state, dispatch] = useReducer((prevState, nextState) => {
        return {...prevState,...nextState}
    },{
        filterMatches: null,
        playedFilter: 'All',
        resultFilter: 'All'
    })

    useEffect(() => {
        try{
            const loadMatchesList = async() => {
                const DB = firestore.getFirestore();   
                const q = query(collection(DB, "matches"));        
                const snapshot =  await getDocs(q);
                let matchesNew = []
                let matchesId = []
                snapshot.docs.forEach((doc) => {
                    // console.log(doc.data())
                    // console.log(doc.id)
                    matchesNew.push(doc.data())
                    matchesId.push(doc.id);
                })
                setMatches(matchesNew);
                //setMatchId(matchesId);
                dispatch({...state, filterMatches: matchesNew, playedFilter: 'All', resultFilter: 'All'})
            }
            if(!matches){
                loadMatchesList()
                //dispatch({...state, filterMatches: matches})
            }
            //console.log(matches)
        }catch(error){
            showToastError(error)
        }
    },[matches, state])

    const showPlayed = (played) => {
        const list = matches.filter((match) => {
            return match.final === played
        });
        dispatch({
            ...state,
            filterMatches: played === 'All' ? matches : list,
            playedFilter: played,
            resultFilter: 'All'
        })
    }

    //console.log(state.filterMatches)

    const showResult = (result) => {
        const list = matches.filter((match) => {
            return match.result === result
        });
        dispatch({
            ...state,
            filterMatches: result === 'All' ? matches : list,
            playedFilter: 'All',
            resultFilter: result
        })
    }

    return (
        <>
            { matches ? 
            <div className='the_matches_container'>
                <div className='the_matches_wrapper'>
                    <div className='left'>
                        <div className='match_filters'>
                            <div className='match_filters_box'>
                                <div className='tag'>
                                    Show matches
                                </div>
                                <div className='cont'>
                                    <div className={`option ${state.playedFilter === 'All' ? 'active' : '' }`} onClick={() => showPlayed('All') }>
                                        All
                                    </div>
                                    <div className={`option ${state.playedFilter === 'Yes' ? 'active' : '' }`} onClick={() => showPlayed('Yes') }>
                                        Played
                                    </div>
                                    <div className={`option ${state.playedFilter === 'No' ? 'active' : '' }`} onClick={() => showPlayed('No') }>
                                        Not Played
                                    </div>
                                </div>
                            </div>
                            <div className='match_filters_box'>
                                <div className='tag'>
                                    Result Games
                                </div>
                                <div className='cont'>
                                    <div className={`option ${state.resultFilter === 'All' ? 'active' : '' }`} onClick={()=>showResult('All')}>
                                        All
                                    </div>
                                    <div className={`option ${state.resultFilter === 'W' ? 'active' : '' }`} onClick={()=>showResult('W')}>
                                        W
                                    </div>
                                    <div className={`option ${state.resultFilter === 'L' ? 'active' : '' }`} onClick={()=>showResult('L')}>
                                        L
                                    </div>
                                    <div className={`option ${state.resultFilter === 'D' ? 'active' : '' }`} onClick={()=>showResult('D')}>
                                        D
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <TheMatchesList matches={state.filterMatches}/>
                    </div>
                    <div className='right'>
                        <Tables />
                    </div>
                </div>
            </div> 
            :   
            <div className='progress'>
                <CircularProgress />
            </div> }
        </>
    );
}

export default TheMatches;