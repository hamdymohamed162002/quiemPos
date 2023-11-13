import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
 import logo from '../assets/sMm6Y26DRv60QTDqElRY.png';
 import Banner from '../assets/login-banner.png';
import '../styles/login.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import {login} from '../redux'
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
const Login = () => {
  let isLoggedIn=!!Cookies.get('token')
      const router = useNavigate();
      const [loading,setloading]=useState(false);
      const [error,seterror]=useState();

      const dispatch=useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('يرجي ادخال البريد الالكتروني'),
      password: Yup.string().required('ادخل رمز المرور'),
    }),
    onSubmit: (values) => {
        axios.post('/login',values).then((res)=>{
           
            dispatch(login(res.data.access_token));
router('/')
        })
        .catch((err)=>{

            seterror(err.response.data.message)
        })  
    },
  });

  useEffect(() => {
  
    if(isLoggedIn){
        router('/')

    }
  }, [isLoggedIn]);
  return (
    <div className="d-flex">
      <div className="login-content">
        <div style={{ width: '80%' }}>
          <img src={logo} alt="Logo" />
          <h3>أهلاً بعودتك !</h3>
          <p>من فضلك قم بتسجيل الدخول للمتابعة والوصول للنظام</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                البريد الالكتروني
              </label>
              <input
                style={{ direction: 'rtl' }}
                type="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                id="email"
                placeholder="ادخل البريد الالكتروني"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                كلمه المرور
              </label>
              <input
                placeholder="ادخل كلمه المرور"
                style={{ direction: 'rtl' }}
                type="password"
                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                id="password"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
             
            </div>
          {error&&
              <div style={{color:'red'}}>{error}</div>
          }
            
            <button type="submit" className="btn btn-primary login-btn mb-3">
              تسجيل الدخول
            </button>
          
          </form>
        </div>
      </div>
      <div className="bg-image">
        <img src={Banner} alt="Banner" />
      </div>
    </div>
  );
};

export default Login;
