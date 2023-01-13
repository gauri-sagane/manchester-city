import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { showToastError, showToastSuccess } from '../utils/Tools';

function Signin(props) {

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema: Yup.object({
            email:Yup.string().email('Invalid email address').required('Email Address is required'),
            password:Yup.string().required('Password is required')
        }),
        onSubmit: (values) => {
            setLoading(true)
            submitForm(values)
        }
    })


    const auth = getAuth();
    const navigate = useNavigate();
    //const history = useHistory();

    const submitForm = (values) => {
        signInWithEmailAndPassword(auth,
            values.email,
            values.password
        ).then(() => {
            //<Redirect to='/dashboard'/>
            
            showToastSuccess('Welcome Back !!')
            navigate('/dashboard')
            //history.push('/dashboard');
            //<Navigate to="/dashboard" />
        }).catch(error => {
            setLoading(false);
            showToastError('The Username or Password is Incorrect')
            
            
        })
    }

    return (
        <div className='container'>
            <div className='signin_wrapper' style={{margin:'100px'}}>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Please Login</h2>
                    <input 
                    name='email' placeholder='Enter Email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                    { formik.touched.email && formik.errors.email ? <div className='error_label'>{formik.errors.email}</div> : null }

                    <input 
                    name='password' type='password' placeholder='Enter Password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                    { formik.touched.password && formik.errors.password ? <div className='error_label'>{formik.errors.password}</div> : null }


                    {loading ? <CircularProgress color='secondary' className='progress'/> 
                    : <button type='submit'>Log In</button> }
                    
                </form>
            </div>
        </div>
    );
}

export default Signin;