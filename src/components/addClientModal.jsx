import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from'../axios.js'
import { toast } from "react-toastify";
import { useRef } from "react";
import { FormControl, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from "@emotion/react";
const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, ' قصير للغاية')
      .max(50, ' طويل للغاية')
      .required('اسم العميل مطلوب'),
    phone: Yup.string()
      .min(2, ' قصير للغاية')
      .max(15, ' طويل للغاية')
      .required('رقم هاتف العميل مطلوب'),
    email: Yup.string().email('البريد الاكتروني غير صحيح ').required('البريد الاكتروني مطلوب'),
  });
const ClientModal = ({show,setShow}) => {
    const toastId = useRef(null);
    const theme = createTheme({
      direction: 'rtl', // Both here and <body dir="rtl">
    });

  
    // Create rtl cache
    const cacheRtl = createCache({
      key: 'muirtl',
      stylisPlugins: [prefixer, rtlPlugin],
    });
    const notify = () => toastId.current =   toast.loading("جاري اضافة العميل");
    const dismiss = () =>  toast.dismiss(toastId.current);

    function handleClose(){
        setShow(false)
    }
    return (
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>اضافة عميل جديد </Modal.Title>
        </Modal.Header>
        <CacheProvider
              value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Modal.Body>
        <Formik
       initialValues={{
        name: '',
        phone: '',
        email: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         // same shape as initial values
         notify()
      axios.post('/customers',values).then(res=>{
          console.log(res.data)
          setShow(false)
          toast.update(toastId.current, { render: " تم اضافة العميل بنجاح ", type: "success", isLoading: false });
       
       }).catch(err=>{
toast.error("حدث خطأ ما")
dismiss()
         
       })}}
     >
       {({ errors, touched }) => (
         <Form>
             
      
       


             <Field name="name" className="form-control w-100" >
           {({field, form})=>(
                <FormControl style={{width:'100%'}}  error={form.errors.name && form.touched.name} >
                <TextField {...field} id="outlined-basic" label="اسم العميل " variant="outlined"
                  error={
                    Boolean(form.errors.name && form.touched.name)
                } />
                </FormControl>
            
           )} 
           </Field>
           {errors.name && touched.name ? (
             <div style={{color:'red'}}>{errors.name}</div>
           ) : null}
          

           <Field name="phone" className="form-control w-100" >
           {({field, form})=>(
                <FormControl style={{width:'100%',marginBlock:'15px'}}  error={form.errors.phone && form.touched.phone} >
                <TextField {...field} id="outlined-basic" label="رقم العميل" variant="outlined" 
                   error={
                    Boolean(form.errors.phone && form.touched.phone)
                }  />
                </FormControl>
            
           )} 
           </Field>
           {errors.phone && touched.phone ? (
             <div style={{color:'red'}}>{errors.phone}</div>
           ) : null}


              <Field name="email" className="form-control w-100" type="email" >
           {({field, form})=>(
                <FormControl style={{width:'100%',marginBlock:'15px'}}  error={form.errors.email && form.touched.email} >
                <TextField {...field} id="outlined-basic" label="البريد الاكتروني " variant="outlined" 
                   error={
                    Boolean(form.errors.email && form.touched.email)
                }  />
                </FormControl>
            
           )} 
           </Field>
           {errors.email && touched.email ? <div style={{color:'red'}}>{errors.email}</div> : null}
           <button className="login-btn border-0 mt-3"  type="submit">اضافة عميل جديد</button>
         </Form>
       )}
     </Formik>

        </Modal.Body>
        </ThemeProvider>
    </CacheProvider>
    </Modal> );
}
 
export default ClientModal;