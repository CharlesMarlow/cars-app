import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getVehicles } from '../../api/api';
import { renderErrorMessage } from '../../helpers/utils';
import Modal from '../Modal/Modal';
import '../../styles/main.css';
import './models.css';
import '../Vehicles/vehicles.css';

const Models = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [vehiclesUnavailableMessage, setVehiclesUnavailableMessage] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);
  const isModels = location && location.state.models;
  const make = location && location.state.make;

  const renderModels = () => {
    const modelsToRender = location.state.models;
    if (isModels && modelsToRender.length === 0) return [];
    return modelsToRender.map((model) => {
      return renderSingleModel(model);
    });
  };

  const renderSingleModel = (model) => {
    return (
      <div key={model} className='item-container'>
        <button
          className='item-button'
          value={model}
          onClick={(e) => onModelClick(e)}
        >
          {model}
        </button>
      </div>
    );
  };

  const onModelClick = async (e) => {
    const modelValue = e.target.value;
    const limit = 10;
    const offset = 0;

    const { data, err } = await getVehicles(make, modelValue, limit, offset);
    if (err) {
      setServerError(true);
      return;
    }
    if (data.total === 0) {
      setVehiclesUnavailableMessage(true);
    } else {
      setVehiclesUnavailableMessage(false);
      navigate('/vehicles', {
        state: { vehicles: data, limit, offset, make, model: modelValue },
      });
    }
  };

  const renderVehicleErrorMessage = () => {
    setTimeout(() => {
      setVehiclesUnavailableMessage(false);
    }, 3000);
    return renderErrorMessage('vehicles');
  };

  return (
    <div className='screen-container'>
      <h2 className='model-title'>Pick a model from the following options:</h2>
      {vehiclesUnavailableMessage && renderVehicleErrorMessage()}
      <div className='row'>{renderModels()}</div>
      {serverError && (
        <Modal
          text={'Service unavailable. Please try again'}
          closeModal={setServerError}
        />
      )}
    </div>
  );
};

export default Models;
