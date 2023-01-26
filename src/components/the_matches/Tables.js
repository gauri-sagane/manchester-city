import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import '../../firebase';
import { firestore } from '../../firebase';
import { getDocs, collection, query } from "firebase/firestore";
import { showToastError } from '../utils/Tools';

function Tables(props) {

    const [positions, setPositions ] = useState(null);

    useEffect(() => {
        try{
            const loadPositions = async() => {
                const DB = firestore.getFirestore();                 
                const q = query(collection(DB, "positions"));
                const snapshot =  await getDocs(q);
                let positionsNew = []
                let positionsId = []
                snapshot.docs.forEach((doc) => {
                    positionsNew.push(doc.data());
                    positionsId.push(doc.id);
                });
                setPositions(positionsNew);
            }
            if(!positions){
                loadPositions();
            }
        }catch(error){
            showToastError(error)
        }
    }, [positions])

    //console.log(positions)

    const showTeamPositions = () => (
        positions ?
        positions.map((position, i) => (
            <TableRow key={i}>
                <TableCell>{i+1}</TableCell>
                <TableCell>{position.team}</TableCell>
                <TableCell>{position.w}</TableCell>
                <TableCell>{position.d}</TableCell>
                <TableCell>{position.l}</TableCell>
                <TableCell>{position.pts}</TableCell>
            </TableRow>
        ))
        : null
    )

    return (
        <div className='league_table_wrapper'>
            <div className='title'>
                League Table
            </div>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Position</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>W</TableCell>
                            <TableCell>L</TableCell>
                            <TableCell>D</TableCell>
                            <TableCell>Pts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { showTeamPositions() }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default Tables;