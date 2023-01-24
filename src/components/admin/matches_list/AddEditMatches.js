import React, { useState, useEffect} from 'react';
import AdminLayout from '../../../hoc/AdminLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToastError, showToastSuccess, textErrorHelper, selectErrorHelper, isSelectError } from '../../utils/Tools';
import { TextField, Select, MenuItem, FormControl, Button } from '@mui/material';
import '../../../firebase';
import { firestore, matchesCollection } from '../../../firebase';
import { getDocs, collection, query, setDoc, updateDoc, doc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router';


const defaultValues = {
    date: '',
    local: '',
    resultLocal: '',
    away: '',
    resultAway: '',
    referee: '',
    stadium: '',
    result: '',
    final: ''
}

function AddEditMatches(props) {

    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState('');
    const [teams, setTeams] = useState(null);
    const [teamsId, setTeamsId] = useState(null);
    const [values, setValues] = useState(defaultValues);
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            date: Yup.string().required('This input is required'),
            local: Yup.string().required('This input is required'),
            resultLocal: Yup.number().required('This input is required').min(0, 'The minimum is 0').max(99, 'The maximum is 99'),
            away: Yup.string().required('This input is required'),
            resultAway: Yup.number().required('This input is required').min(0, 'The minimum is 0').max(99, 'The maximum is 99'),
            referee: Yup.string().required('This input is required'),
            stadium: Yup.string().required('This input is required'),
            result: Yup.mixed().required('This input is required').oneOf(['W', 'D', 'L', 'n/a']),
            final: Yup.mixed().required('This input is required').oneOf(['Yes', 'No'])
        }),
        onSubmit: (values) => {
            //console.log(values)
            submitForm(values)
        }
    })

    const navigate = useNavigate();
    const { matchid } = useParams();

    const showTeams = () => (
        teams ? 
            teams.map((item, i) => (
                <MenuItem key={i} value={item.shortName}>{item.shortName}</MenuItem>
            ))
         
        : null
    )

    const submitForm = async(values) => {
        let dataToSubmit = values;
        teams.forEach((team) => {
            if(team.shortName === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.thmb
            }
            if(team.shortName === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.thmb
            }
        })
        setLoading(true);
        if(formType === 'add'){
            try{
                await setDoc(matchesCollection, dataToSubmit)
                showToastSuccess('Match Added!!');
                formik.resetForm();
                navigate('/admin_matches')
            }catch(error){
                showToastError('Sorry something went wrong!!',error)
            }finally{
                setLoading(true);
            }
        }else{
            try{
                const DB = firestore.getFirestore();
                const match = doc(DB, "matches", matchid);
                await updateDoc(match, dataToSubmit)
                showToastSuccess('Match Updated Successfully!!')
            }catch(error){
                showToastError('Sorry something went wrong!!',error);
            }finally{
                setLoading(true);
            }
        }
        //console.log(values)
    }

    

    useEffect(() => {
        try{  
            const loadTeams = async() => {
                const DB = firestore.getFirestore();                 
                const q = query(collection(DB, "teams"));
                const snapshot =  await getDocs(q);
                let teamsNew = []
                let teamsId = []
                snapshot.docs.forEach((doc) => {
                    teamsNew.push(doc.data());
                    teamsId.push(doc.id);
                });
                setTeams(teamsNew);
                setTeamsId(teamsId);
            }
            if(!teams){
                loadTeams()
            }
        }catch(error){
            showToastError(error)
        }
    },[teams])

    //console.log(teams);
    //console.log(teamsId)

    useEffect(() => {
        const param = matchid
        if(param){
            try{
                const loadMatches = async() => {
                    const DB = firestore.getFirestore();
                    const q = query(collection(DB, "matches"));           
                    const snapshot =  await getDocs(q);
                    let found = 0;
                    snapshot.docs.forEach((doc) => {
                        if(doc.id === param){
                            found = 1
                            setFormType('edit')
                            //console.log(doc.data().imageName)
                            setValues(doc.data());
                        }
                    })
                    if(found === 0){
                        showToastError('Sorry, nothing was found');
                    }
                }
                loadMatches()
            }catch(error){
                showToastError(error)
            }
        }else{
            setFormType('add');
            setValues(defaultValues)
        }
    }, [matchid])

    //console.log(values)

    return (
        <AdminLayout title={ formType === 'add' ? 'Add Match' : 'Edit Match '}>
            <div className='editmatch_dialog_wrapper'>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <h4>Select Date</h4>
                            <FormControl>
                                <TextField id="date" name='date' type='date' variant='outlined' {...formik.getFieldProps('date')} {...textErrorHelper(formik, 'date')}/>
                            </FormControl>
                        </div>
                        <hr/>
                        <div>
                            <h4>Result local</h4>
                            <FormControl error={isSelectError(formik, 'local')}>
                                <Select id="local" name='local' variant='outlined' displayEmpty {...formik.getFieldProps('local')}>
                                    <MenuItem value='' disabled>Select a team</MenuItem>
                                    {showTeams()}
                                </Select>
                                {selectErrorHelper(formik, 'local')}
                            </FormControl>
                            <FormControl style={{marginLeft: '10px'}}>
                                <TextField id="resultLocal" name='resultLocal' type='number' variant='outlined' {...formik.getFieldProps('resultLocal')} {...textErrorHelper(formik, 'resultLocal')}/>
                            </FormControl>
                        </div>
                        <div>
                            <h4>Result away</h4>
                            <FormControl error={isSelectError(formik, 'away')}>
                                <Select id="away" name='away' variant='outlined' displayEmpty {...formik.getFieldProps('away')}>
                                    <MenuItem value='' disabled>Select a team</MenuItem>
                                    {showTeams()}
                                </Select>
                                {selectErrorHelper(formik, 'away')}
                            </FormControl>
                            <FormControl style={{marginLeft: '10px'}}>
                                <TextField id="resultAway" name='resultAway' type='number' variant='outlined' {...formik.getFieldProps('resultAway')} {...textErrorHelper(formik, 'resultAway')}/>
                            </FormControl>
                        </div>
                        <hr />
                        <div>
                            <h4>Match Info</h4>
                            <div className='mb-15'>
                                <FormControl>
                                    <TextField id="referee" name='referee' variant='outlined' placeholder='Add the referee name' {...formik.getFieldProps('referee')} {...textErrorHelper(formik, 'referee')}/>
                                </FormControl>
                            </div>
                            <div className='mb-15'>
                                <FormControl>
                                    <TextField id="stadium" name='stadium' variant='outlined' placeholder='Add the stadium name' {...formik.getFieldProps('stadium')} {...textErrorHelper(formik, 'stadium')}/>
                                </FormControl>
                            </div>
                            <div className='mb-15'>
                                <FormControl error={isSelectError(formik, 'result')}>
                                    <Select id="result" name='result' variant='outlined' displayEmpty {...formik.getFieldProps('result')}>
                                        <MenuItem value='' disabled>Select a result</MenuItem>
                                        <MenuItem value='W'>Win</MenuItem>
                                        <MenuItem value='D'>Draw</MenuItem>
                                        <MenuItem value='L'>Lose</MenuItem>
                                        <MenuItem value='n.a'>Not Available</MenuItem>
                                    </Select>
                                    {selectErrorHelper(formik, 'result')}
                                </FormControl>
                            </div>
                            <div className='mb-15'>
                                <FormControl error={isSelectError(formik, 'final')}>
                                    <Select id="final" name='final' variant='outlined' displayEmpty {...formik.getFieldProps('final')}>
                                        <MenuItem value='' disabled>Was the game played?</MenuItem>
                                        <MenuItem value='Yes'>Yes</MenuItem>
                                        <MenuItem value='No'>No</MenuItem>
                                    </Select>
                                    {selectErrorHelper(formik, 'final')}
                                </FormControl>
                            </div>
                            <Button type='submit' variant='outlined' color='primary' disabled={loading}>
                               { formType === 'add' ? 'Add Match' : 'Edit Match' }
                          </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AddEditMatches;