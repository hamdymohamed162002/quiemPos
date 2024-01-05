// src/components/Receipt.js
import React, { forwardRef } from 'react';
import { Card, Table } from 'react-bootstrap';
import BarCode from '../assets/Barcode.png';
import logo from '../assets/logo.png'
const Receipt = forwardRef(({ order }, ref) => {
  const styles = {
    card: {
      width: '300px',
      margin: '20px',
      padding: '10px',
   
    },
    header: {
      borderBottom: '1px solid #ccc',
      paddingBottom: '10px',
      marginBottom: '10px',
    },
  };
  
 const extra =order.items.reduce((extrasArray, item) => {
  if (item.product.extras) {
    extrasArray.push(...item.product.extras.map(extra => ({ ...extra, orderId: order.id })));
  }
  return extrasArray;
}, []);

  return (
    <div id='invoice-POS' ref={ref} style={styles.card}>
      <div>
        <div>
          <p style={{color:'black',textAlign:"center",fontSize:"24px",marginBlock:"0"}}>
            <strong> {order.id}#</strong>
          <p className='m-0' style={{fontSize:"12px",marginBottom:'3px',color:'black'}}>فاتورة ضريبة مبسطة</p>
          </p>
        </div>
        <div className='d-flex flex-column align-items-center'>
          <img src={logo} style={{width:"100px",height:'100px'}} />
          <p style={{color:'black',textAlign:"center",fontSize:"18px",marginBottom:'0px'}}>
            <strong>   اسم المحل</strong>
          </p>
          <p style={{color:'black',textAlign:"center",fontSize:"10px",direction:'rtl' ,marginBottom:'0px',marginTop:'2px'}}>
            <strong>   الرقم الضريبي :5845454215</strong>
          </p>
          <p style={{color:'black',textAlign:"center",fontSize:"10px",direction:'rtl',marginTop:'2px',marginBottom:'2px'}}>
            <strong>    فرع الرياض - 012452121 </strong>
          </p>
        </div>
        
        <p style={{marginBottom:'10px',borderBlock:'1px dashed black',textAlign:'center',paddingBlock:"5px",}}> {order.created_at}</p>
       
      
      
      
      

        
        <p style={{marginBottom:'2px',marginTop:"3px"}}>اسم الموظف: احمد محمد</p>
        
        <p style={{marginBottom:'3px',marginTop:'3px'}}>العميل: {order.customer.name}</p>
       
        <p style={{marginBottom:'5px',marginTop:'3px'}}> رقم العميل :545 </p>
        <p style={{marginBottom:'5px',marginTop:'3px'}}> وسيلة الدفع  :كاش </p>

       
      
        
        <div id="table">
						<table>
							<tr className="tabletitle" style={{backgroundColor:'transparent !important',borderBottom:"1px dashed black"}}>
								<td className="item"><h2>الكمية</h2></td>
								<td className="Hours"><h2>الاسم</h2></td>
								<td className="Rate"><h2> السعر</h2></td>
								<td className="Rate"><h2> الاجمالي</h2></td>

							</tr>
                       
            {order.items.map((item) => (
         <>
              <tr service key={item.id}>
              <td  className="tableitem" style={{width:"120px"}}><p className="itemtext">{item.product.title} 
              <br/>
              {
                item?.product?.extras?.map((extra,i) => (
                  <span>  {i!=0 && '+'}{extra?.title}  </span>
                ))
              }
              </p></td>
                <td className="tableitem"><p className="itemtext">{item.quantity}</p></td>
        
                <td className="tableitem"><p className="itemtext">${item.product.price}</p></td>
                <td className="tableitem"> <p className="itemtext">${item.total}</p></td>
              </tr>
            
                </>
            ))}
     
							
        <tr className="tabletitle" style={{backgroundColor:'transparent !important',borderTop:"1px dashed black"}}>
								<td></td>
								<td></td>

								<td className="Rate"><h2>الاجمالي</h2></td>
								<td className="payment"><h2>{order.total} $</h2></td>
							</tr>

							<tr className="tabletitle">
								<td></td>
								<td></td>


								<td className="Rate"><h2>الضريبة</h2></td>
								<td className="payment"><h2>${order.tax}</h2></td>
							</tr>
           
							
              <tr className="tabletitle">
								<td></td>
								<td></td>


								<td className="Rate"><h2>الاجمالي بالضريبة</h2></td>
								<td className="payment"><h2>${order.grand_total}</h2></td>
							</tr>
						</table>
            <div className='d-flex justify-content-center'>
<img style={{width:'100px'}} src={BarCode} />
            </div>
            <p>
            هي إجراء يهدف إلى تحويل عملية إصدار وحفظ الفواتير واإلشعارات الورقية لعملية إلكترونية
تسمح بتبادل الفواتير واإلشعارات المدينة والدائنة بتنظيم إلكتروني متكامل.

            </p>
            <p style={{marginBottom:'10px',borderBlock:'1px dashed black',textAlign:'center',paddingBlock:"5px",fontWeight:'700',color:'black'}}> شكرا لزيارتنا !</p>
       
					</div>

      </div>
    </div>


  );
});

export default Receipt;
