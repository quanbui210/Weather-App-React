import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalShow = ({onShow, onHide, error}) => {
  
    return (
        <Modal show={onShow} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{error.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ModalShow 