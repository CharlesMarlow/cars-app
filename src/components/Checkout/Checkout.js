import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { capitalize } from '../../helpers/utils';
import '../../styles/main.css'
import './checkout.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
    const selectedVehicle = location.state.vehicle;
    
    const onFinishClick = () => {
        navigate('/');
    }

  const renderSelectedVehicle = () => {
    return (
      <div className='card'>
        <div className='row'>
          <div className='column'>
            <h2>
              {capitalize(selectedVehicle.make)} {selectedVehicle.model}
            </h2>
            <div className='card-text'>
              Body type: {selectedVehicle.bodyType}
            </div>
            <div className='card-text'>Tank: {selectedVehicle.fuelType}</div>
            <div className='card-text'>
              Engine capacity: {selectedVehicle.engineCapacity}
            </div>
            <div className='card-text'>
              Horse power: {selectedVehicle.enginePowerPS}
            </div>
            <div className='card-text'>
              Engine power KW: {selectedVehicle.enginePowerKW}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='screen-container'>
      <h3 className='checkout-title'>
        Congratulations! You've successfully selected
      </h3>
      {renderSelectedVehicle()}
      <h4>One of our agents will contact you soon</h4>
      <h4>Thank you for your purchase!</h4>
      <button className='checkout-btn' onClick={() => onFinishClick()}>
        Finish
      </button>
    </div>
  );
};

export default Checkout;
