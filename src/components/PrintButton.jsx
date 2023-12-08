// src/components/PrintButton.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import Receipt from './Receipt';

const PrintButton = ({ order }) => {
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
     
       
    </div>
  );
};

export default PrintButton;
