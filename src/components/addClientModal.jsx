import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from'../axios.js'
import { toast } from "react-toastify";
import { useRef } from "react";
const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, ' قصير للغاية')
      .max(50, ' طويل للغاية')
      .required('مطلوب'),
    phone: Yup.string()
      .min(2, ' قصير للغاية')
      .max(15, ' طويل للغاية')
      .required('مطلوب'),
    email: Yup.string().email('البريد الاكتروني غير صحيح ').required('مطلوب'),
  });
const ClientModal = ({show,setShow}) => {
    const toastId = useRef(null);

    const notify = () => toastId.current =   toast.loading("جاري اضافة العميل");
    const dismiss = () =>  toast.dismiss(toastId.current);

    function handleClose(){
        setShow(false)
    }
    return ( <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>اضافة عميل جديد </Modal.Title>
        </Modal.Header>
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
              <div>اسم العميل</div>
           <Field name="name" className="form-control mt-2" />
           {errors.name && touched.name ? (
             <div style={{color:'red'}}>{errors.name}</div>
           ) : null}
              <div className="mt-3">رقم العميل </div>

           <Field name="phone" className="form-control"  />
           {errors.phone && touched.phone ? (
             <div style={{color:'red'}}>{errors.phone}</div>
           ) : null}
              <div className="mt-3">البريد الالكتروني  </div>

           <Field name="email" style={{direction:'rtl'}} className="form-control"  type="email" />
           {errors.email && touched.email ? <div style={{color:'red'}}>{errors.email}</div> : null}
           <button className="login-btn border-0 mt-3"  type="submit">اضافة عميل جديد</button>
         </Form>
       )}
     </Formik>

        </Modal.Body>
    </Modal> );
}
 
export default ClientModal;