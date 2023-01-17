import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToastError, showToastSuccess } from '../../utils/Tools';
import '../../../firebase';
import { firestore, promotionsCollection } from '../../../firebase';
import { getDocs, collection, query, where, setDoc } from "firebase/firestore";

function Enroll(props) {

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { email:'' },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid Email').required('The email is required')
        }),
        onSubmit: ( values ) => {
            setLoading(true);
            submitForm(values);
        }
    })

    const submitForm = async(values) => {
        try{
            const DB = firestore.getFirestore();
            const q = query(collection(DB, "promotions"), where("email", "==", values.email));
            const isOnTheList = await getDocs(q);
            if(isOnTheList.docs.length >= 1){
                showToastError('Sorry you are on the list already');
                formik.resetForm();
                setLoading(false);
                return false;
            }
           
            await setDoc(promotionsCollection, {email: values.email})

            showToastSuccess('Congratulations You are Added to the List!!');
            formik.resetForm();
            setLoading(false);
        }catch(error){
            showToastError(error)
        }
    }

    return (
        <Fade>
            <div className='enroll_wrapper'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='enroll_title'>
                        Enter Your Email
                    </div>
                    <div className='enroll_input'>
                        <input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder='Enter Your Email'/>
                        { formik.touched.email && formik.errors.email ? 
                        <div className='error_label'>
                            { formik.errors.email }
                        </div> : null }
                        { loading ? 
                        <CircularProgress color='secondary' className='progress'/>

                        : <button type='submit'>Enroll</button> }
                        <div className='enroll_discl'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </div>
                    </div>
                </form>
            </div>
        </Fade>
    );
}

export default Enroll;