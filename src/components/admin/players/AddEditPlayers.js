import React, { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router';
import AdminLayout from '../../../hoc/AdminLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToastError, showToastSuccess, textErrorHelper, selectErrorHelper, isSelectError } from '../../utils/Tools';
import FileUpload from '../../utils/FileUpload';
import { TextField, Select, MenuItem, FormControl, Button } from '@mui/material';
import '../../../firebase';
import { firestore, playersCollection } from '../../../firebase';
import { getDocs, collection, query, setDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, getDownloadURL, ref } from "firebase/storage";


const storage = getStorage();

const defaultValues = {
    name: '',
    lastname: '',
    number: '',
    position: '',
    image: '',
    imageName: ''
}

function AddEditPlayers(props) {

    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState('');
    const [values, setValues] = useState(defaultValues);
    const [defaultImg, setDefaultImg] = useState('');

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            name: Yup.string().required('This input is required'),
            lastname: Yup.string().required('This input is required'),
            number: Yup.number().required('This input is required').min(0, 'The minimum is Zero').max(100, 'The minimum is 100'),
            position: Yup.string().required('This input is required'),
            image: Yup.string().required('This input is required'),
            imageName: Yup.string().required('This input is required')
        }),
        onSubmit: (values) => {
            //console.log(values);
            submitForm(values);
        }
    });

    const navigate = useNavigate();
    let { playerid } = useParams();
    const submitForm = async(values) => {
        const dataToSubmit = values;
        setLoading(true);

        if( formType === 'add'){
            try{
                await setDoc(playersCollection, dataToSubmit)
    
                showToastSuccess('Player Added!!');
                formik.resetForm();
                setLoading(false);
                navigate('/admin_players')
            }catch(error){
                showToastError(error)
            }
        }else{
            try{
                //console.log('Inside')
                const DB = firestore.getFirestore();
                
                const player = doc(DB, "players", playerid);
                //console.log(frankDocRef)
                //console.log(dataToSubmit)
                await updateDoc(player, {
                    name: dataToSubmit.name,
                    lastname: dataToSubmit.lastname,
                    position: dataToSubmit.position,
                    number: dataToSubmit.number,
                    image: dataToSubmit.image,
                    imageName: dataToSubmit.imageName
                });
                showToastSuccess('Player Updated Successfully!!')
                
                
            }catch(error){
                showToastError(error)
            }finally{
                setLoading(false)
            }
        }
    }

    
    //console.log(playerid)
    useEffect(() => {
        const param = playerid
        if(param){
            try{
                const loadPlayer = async() => {
                    
                    const DB = firestore.getFirestore();
                        
                    const q = query(collection(DB, "players"));
                    
                    const snapshot =  await getDocs(q);
                    let found = 0;
                    snapshot.docs.forEach((doc) => {
                        if(doc.id === param){
                            found = 1
                            setFormType('edit')
                            //console.log(doc.data().imageName)
                            const playerImage = ref(storage, doc.data().imageName);
                            setValues(doc.data())
                            getDownloadURL(playerImage)
                            .then((url) => {                            
                                //console.log(url.split("token=")[1]+".png") 
                                //console.log(this.downloadURL)
                                //updateImageName(doc.data().imageName);
                                setDefaultImg(url)
                            })
                            .catch((error) => {
                                console.log(error)
                            });
                        }
                    })
                    if(found === 0){
                        showToastError('Sorry, nothing was found');
                    }
                    
                }
                
                loadPlayer();
                
            }catch(error){
                showToastError(error)
            }
           
        }else{
            setFormType('add')
            setValues(defaultValues)
        }
    },[playerid])

    const updateImageToken = (token) => {
        formik.setFieldValue('image', token);
    }
    
    const updateImageName = (filename) => {
        formik.setFieldValue('imageName', filename);
    }

    const resetImage = () => {
        formik.setFieldValue('imageName', '');
        setDefaultImg('');
    }

    return (
        <AdminLayout title={formType === 'add' ? 'Add Player' : 'Edit Player'}>
            <div className='editplayers_dialog_wrapper'>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl error={ isSelectError(formik, 'image') }>                     
                            {formik.values.imageName != null ?
                            <div>
                            <FileUpload token={(token) => updateImageToken(token)} defaultImg={defaultImg} filename={(filename) => updateImageName(filename)} defaultImgName={formik.values.imageName} />
                            { formType === 'edit' && defaultImg !== '' ? 
                                <div className='image_upload_container'>
                                    <img src = {defaultImg} style={{width: '100%'}} alt="Player"/>
                                    <div className='remove' onClick={()=>resetImage()}>Remove</div>
                                </div> : null }
                            </div> : null }
                            {selectErrorHelper(formik, 'image')}       
                        </FormControl>
                        <hr />
                        <h4>Player Info</h4>
                        <div className='mb-5'>
                            <FormControl>
                                <TextField id='name' name='name' variant='outlined' placeholder='Add Firstname' {...formik.getFieldProps('name')} {...textErrorHelper(formik, 'name')}>
                                    
                                </TextField>
                            </FormControl>
                        </div>
                        <div className='mb-5'>
                            <FormControl>
                                <TextField id='lastname' name='lastname' variant='outlined' placeholder='Add Lastname' {...formik.getFieldProps('lastname')} {...textErrorHelper(formik, 'lastname')}>
                                    
                                </TextField>
                            </FormControl>
                        </div>
                        <div className='mb-5'>
                            <FormControl>
                                <TextField id='number' name='number' type='number' variant='outlined' placeholder='Add Number' {...formik.getFieldProps('number')} {...textErrorHelper(formik, 'number')}>
                                    
                                </TextField>
                            </FormControl>
                        </div>
                        <div className='mb-5'>
                            <FormControl error={ isSelectError(formik, 'position') }>
                                <Select id='position' name='position' variant='outlined' displayEmpty {...formik.getFieldProps('position')}>
                                    <MenuItem value="" disabled>Select a Position</MenuItem>
                                    <MenuItem value="Keeper">Keeper</MenuItem>
                                    <MenuItem value="Defence">Defence</MenuItem>
                                    <MenuItem value="Midfield">Midfield</MenuItem>
                                    <MenuItem value="Striker">Striker</MenuItem>
                                   
                                </Select>
                                {selectErrorHelper(formik, 'position')}
                            </FormControl>
                        </div>
                        <Button type='submit' variant='outlined' color='primary' disabled={loading}>
                            { formType === 'add' ? 'Add player' : 'Edit player' }
                        </Button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AddEditPlayers;