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
    const [matchId, setMatchId] = useState(null);

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
                setMatchId(matchesId);
            }
            if(!matches){
                loadMatchesList()
            }
            //console.log(matches)
        }catch(error){
            showToastError(error)
        }
    },[matches])

    

    return (
        <>
            { matches ? 
            <div className='the_matches_container'>
                <div className='the_matches_wrapper'>
                    <div className='left'>

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