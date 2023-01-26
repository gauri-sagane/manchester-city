import React, { useState, useEffect } from 'react';
import PlayerCard from '../utils/PlayerCard';
import { Slide } from 'react-awesome-reveal';
import { showToastError } from '../utils/Tools';
import { CircularProgress } from '@mui/material';
import { Promise } from 'core-js';
import '../../firebase';
import { firestore } from '../../firebase';
import { getDocs, collection, query } from "firebase/firestore";
import { getStorage, getDownloadURL, ref } from "firebase/storage";

const storage = getStorage();
function TheTeam(props) {

    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState(null);
    const [imgURL, setImgURL] = useState(null);

    useEffect(() => {
        try{
            const getPlayers = async() => {
                const DB = firestore.getFirestore();  
                const player = query(collection(DB, "players"));            
                const snapshot = await getDocs(player);
                let playersNew = []
                let imgName = []
                snapshot.docs.forEach((doc) => {
                    //console.log(doc.id, " => ", doc.data());
                    playersNew.push(doc.data())
                    imgName.push(doc.data().imageName)
                })
                //console.log(imgName)
                setPlayers(playersNew)
                let promises = []
                let imgURL = []
                imgName.forEach((name, index) => {
                    promises.push(
                        new Promise((resolve, reject) => {
                            const playerImage = ref(storage, name);
                            getDownloadURL(playerImage)
                            .then((url) => {
                                // console.log(url)
                                //imgURL.push(url)
                                imgURL[index] = url;
                                resolve()
                            })
                            .catch((error) => {
                                console.log(error)
                                reject()
                            });
                        })
                    )
                    
                })
                Promise.all(promises).then(()=>{
                    //console.log(imgURL)
                    setImgURL(imgURL)
                })
                
            }
            if(!players){
                getPlayers()           
            }
        }catch(error){
            showToastError('Sorry try again later!!')
        }finally{
            setLoading(false);
        }
    },[players])

    const showPlayerByCategory = (category) => (
        imgURL && players ? 
        players.map((player, i) => {
            return player.position === category ? 
            <Slide left key={player.name} triggerOnce>
                <div className='item'>
                    <PlayerCard 
                    number = {player.number} name={player.name} lastname={player.lastname} bck={imgURL[i]}/>
                </div>
            </Slide> : null
        }) : null 
    )

    return (
        <div className='the_team_container'>
            { loading ? 
            <div className='progress'>
                <CircularProgress />
            </div> : 
            <div>
                <div className='team_category_wrapper'>
                    <div className='title'>Keepers</div>
                    <div className='team_cards'>
                        {showPlayerByCategory('Keeper')}
                    </div>
                </div>
                <div className='team_category_wrapper'>
                    <div className='title'>Defence</div>
                    <div className='team_cards'>
                        {showPlayerByCategory('Defence')}
                    </div>
                </div>
                <div className='team_category_wrapper'>
                    <div className='title'>Midfield</div>
                    <div className='team_cards'>
                        {showPlayerByCategory('Midfield')}
                    </div>
                </div>
                <div className='team_category_wrapper'>
                    <div className='title'>Strikers</div>
                    <div className='team_cards'>
                        {showPlayerByCategory('Striker')}
                    </div>
                </div>
            </div> }
        </div>
    );
}

export default TheTeam;