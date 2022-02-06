import React from 'react';
import './modal.css';

const Modal = ({ text, closeModal }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <button className='close' onClick={() => closeModal(false)}>&times;</button>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Modal;
