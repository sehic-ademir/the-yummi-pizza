import React from 'react';
import {Modal, Button} from 'react-bootstrap';
export default function OrderProcessing(props) {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
      <>
       {props.phone && props.address ?  <Button variant="light" className="col-12 btn-cart-checkout" onClick={handleShow} type="submit"> 
        PROCEED TO CHECKOUT
        </Button> : ''} 
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Order confirmed</Modal.Title>
          </Modal.Header>
          <Modal.Body>Expect your order soon at <span className="font-weight-bold">{props.address}</span>! When we arrive, we will call you on <span className="font-weight-bold">{props.phone}</span>.
          {props.note ?  <span> Your note for us was <span className="font-weight-bold">{props.note}</span></span> : ''}
          
          <p>The total order was: {props.totalCostEuro}€ ($ {props.totalCostUSD})</p>
           </Modal.Body>
          <Modal.Footer>
            <Button  variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
