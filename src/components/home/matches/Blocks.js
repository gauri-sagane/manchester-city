import React, { useState, useEffect } from 'react';
import { Slide } from 'react-awesome-reveal';
import '../../../firebase';
import { firestore } from '../../../firebase';
//import * as firestore from 'firebase/firestore';
import { getDocs, collection, query, where } from "firebase/firestore";
import MatchBlock from '../../utils/MatchBlock';

function Blocks(props) {
    const [matches, setMatches] = useState([])

    

    useEffect(() => {
        try{
            const getMatches = async() => {
                const DB = firestore.getFirestore();
                
                const q = query(collection(DB, "matches"), where("date", "!=", null));
                
                const snapshot =  await getDocs(q);
               
                let matchesNew = []
                snapshot.docs.forEach((doc) => {
                    //console.log(doc.id, " => ", doc.data());
                    
                    matchesNew.push(doc.data())
                     
                    //setMatches(doc.data())
                })
                //console.log(matchesNew)
                setMatches(matchesNew)
            }
            if(!matches.length > 0){
                getMatches()
                
            }
        }
        catch(error) {
                console.log(error)
            }
        
    }, [matches])

    let i=0;
    const showMatches = (matches) => (
        
        matches ? 
        matches.map(match => (
            
            <Slide bottom key={i++} className='item' triggerOnce>
                <div className='wrapper'>
                    <MatchBlock match={match}/>
                </div>
            </Slide>
            
        ))
        : null
    )
    
    return (
        <div className='home_matches'> 
            {showMatches(matches)}
        </div>
    );
}

export default Blocks;