import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../hoc/AdminLayout';
import '../../../firebase';
import { firestore } from '../../../firebase';
import { getDocs, collection, query, limit, startAfter } from "firebase/firestore";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { showToastError } from '../../utils/Tools';
import { Link } from 'react-router-dom';

function MatchesList(props) {

    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState(null);
    const [matchId, setMatchId] = useState(null);

    useEffect(() => {
        try{
            const loadMatches = async() => {
                setLoading(true);
                const DB = firestore.getFirestore();   
                const q = query(collection(DB, "matches"), limit(2));        
                const snapshot =  await getDocs(q);
                //console.log(snapshot)
                const lastVisible = snapshot.docs[snapshot.docs.length-1];
                let matchesNew = []
                let matchesId = []
                snapshot.docs.forEach((doc) => {
                    // console.log(doc.data())
                    // console.log(doc.id)
                    matchesNew.push(doc.data())
                    matchesId.push(doc.id);
                })
                    
                setLastVisible(lastVisible);
                setMatches(matchesNew);
                setMatchId(matchesId);
                    
            }
            if(!matches){
                loadMatches()
            }
        }catch(error){
            showToastError(error);
        }finally{
            setLoading(false)
        }
    },[matches, matchId])


    const loadMoreMatches = async() => {
        if(lastVisible){
            try{
                setLoading(true);
                const DB = firestore.getFirestore();
                            
                const q = query(collection(DB, "matches"), startAfter(lastVisible), limit(2));
                
                const snapshot =  await getDocs(q);
                const newLastVisible = snapshot.docs[snapshot.docs.length-1];
                let matchesNew = []
                let matchesIdNew = []
                snapshot.docs.forEach((doc) => {
                    matchesNew.push(doc.data())
                    matchesIdNew.push(doc.id)
                })
                
                setLastVisible(newLastVisible);
                setMatches([...matches,...matchesNew]);
                setMatchId([...matchId,...matchesIdNew])
            }catch(error){
                showToastError(error);
            }finally{
                setLoading(false);
            }
            
        }else{
            showToastError('Nothing to load');
            
        }


    }

    return (
        <div>
            <AdminLayout title="The Matches">
                <div className='mb-5'>
                    <Button variant='outlined' to={'/admin_matches/add_match'} component={Link}>Add Match</Button>
                </div>
                <Paper className='mb-5'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Match</TableCell>
                                <TableCell>Result</TableCell>
                                <TableCell>Final</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { matches ? matches.map((match, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        {match.date}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_matches/edit_match/${matchId[i]}`}>{match.away} <strong>-</strong> {match.local}</Link>
                                    </TableCell>
                                    <TableCell>
                                        {match.resultAway} <strong>-</strong> {match.resultLocal}
                                    </TableCell>
                                    <TableCell>
                                        {match.final === 'Yes' ? <span className='matches_tag_green'>Final</span> : <span className='matches_tag_red'>Not Played Yet</span> }
                                    </TableCell>
                                </TableRow>
                            )) : null}
                        </TableBody>
                    </Table>
                </Paper>
                <Button onClick={() => loadMoreMatches()} variant="contained" color='primary' disabled={loading}>Load More</Button>
                <div className='admin_progress'>
                    { loading ? <CircularProgress thickness={7} style={{ 
                        color: '#98c5e9'
                    }}>

                    </CircularProgress> : null }
                </div>
            </AdminLayout>
        </div>
    );
}

export default MatchesList;