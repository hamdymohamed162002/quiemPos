import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

import Offcanvas from 'react-bootstrap/Offcanvas';
import SideBar from './sidebar';

function MobileSideBar({show}) {



  return (
    <>
  

   

      <Offcanvas show={show} placement={'end'}  >
    
        <Offcanvas.Body>
         <SideBar mobile  />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MobileSideBar;