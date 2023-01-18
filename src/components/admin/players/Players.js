import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../hoc/AdminLayout';
import '../../../firebase';
import { firestore } from '../../../firebase';
import { getDocs, collection, query, where, limit, startAfter } from "firebase/firestore";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { showToastError } from '../../utils/Tools';
import { Link } from 'react-router-dom';

function Players(props) {
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState(null);
    const [playerId, setPlayerId] = useState(null);

    useEffect(() => {
        try{
            const loadPlayers = async() => {
                
                    setLoading(true);
                    const DB = firestore.getFirestore();
                        
                    const q = query(collection(DB, "players"), where("name", "!=", null), limit(2));
                    
                    const snapshot =  await getDocs(q);
                    const lastVisible = snapshot.docs[snapshot.docs.length-1];
                    let playersNew = []
                    let playersId = []
                    snapshot.docs.forEach((doc) => {
                        playersNew.push(doc.data())
                        playersId.push(doc.id);
                    })
                    
                    setLastVisible(lastVisible);
                    setPlayers(playersNew);
                    setPlayerId(playersId);
            }
            if(!players){
                loadPlayers()
            }
        }catch(error){
            showToastError(error)
        }finally{
            setLoading(false);
        }
        
    },[players])

    const loadMorePLayers = async() => {
        if(lastVisible){
            try{
                setLoading(true);
                const DB = firestore.getFirestore();
                            
                const q = query(collection(DB, "players"), where("name", "!=", null), startAfter(lastVisible), limit(2));
                
                const snapshot =  await getDocs(q);
                const newLastVisible = snapshot.docs[snapshot.docs.length-1];
                let playersNew = []
                let playersIdNew = []
                snapshot.docs.forEach((doc) => {
                    playersNew.push(doc.data())
                    playersIdNew.push(doc.id)
                })
                
                setLastVisible(newLastVisible);
                setPlayers([...players,...playersNew]);
                setPlayerId([...playerId,...playersIdNew])
            }catch(error){
                showToastError(error);
            }finally{
                setLoading(false);
            }
            
        }else{
            showToastError('Nothing to load');
            
        }


    }

    //console.log(players);
    //console.log(playerId);
    //console.log(lastVisible);

    return (
        <AdminLayout title="The Players">
            <div className='mb-5'>
                <Button variant='outlined' to={'/admin_players/add-player'} component={Link}>Add Player</Button>
            </div>
            <Paper className='mb-5'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Position</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { players ? players.map((player, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Link to={`/admin_players/edit_player/${playerId[i]}`}>{player.name}</Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin_players/edit_player/${playerId[i]}`}>{player.lastname}</Link>
                                </TableCell>
                                <TableCell>
                                    {player.number}
                                </TableCell>
                                <TableCell>
                                    {player.position}
                                </TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </Paper>
            <Button onClick={() => loadMorePLayers()} variant="contained" color='primary' disabled={loading}>Load More</Button>
            <div className='admin_progress'>
                { loading ? <CircularProgress thickness={7} style={{ 
                    color: '#98c5e9'
                }}>

                </CircularProgress> : null }
            </div>
        </AdminLayout>
    );
}

export default Players;