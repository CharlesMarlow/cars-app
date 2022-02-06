import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { capitalize } from '../../helpers/utils';
import Modal from '../Modal/Modal';
import { getVehicles } from '../../api/api';
import '../../styles/main.css';
import './vehicles.css';

const Vehicles = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vehicles = location.state.vehicles || { page: 0, total: 0 };
  const limit = location.state.limit;
  const offset = location.state.offset;
  const make = location.state.make;
  const model = location.state.model;
  const [filteredVehicles, setFilteredVehicles] = React.useState(vehicles);
  const [serverError, setServerError] = React.useState(false);

  React.useEffect(() => {
    renderVehicleCards();
  });

  const onSelectClick = (vehicle) => {
    navigate('/checkout', { state: { vehicle } });
  };

  const onPaginationClick = async (direction) => {
    const { data, err } = await getVehicles(
      make,
      model,
      10,
      offset + direction
    );
    if (err) {
      setServerError(true);
      return;
    }
    location.state.offset += direction;
    setFilteredVehicles(data);
  };

  const renderActionButtons = () => {
    return (
      <div className='action-buttons-container'>
        <button
          disabled={offset === 0}
          className='btn'
          onClick={() => onPaginationClick(-1)}
        >
          Back
        </button>
        <button
          disabled={(offset + 1) * limit > vehicles.total}
          className='btn'
          onClick={() => onPaginationClick(1)}
        >
          Next
        </button>
      </div>
    );
  };

  const renderVehicleCards = () => {
    if (filteredVehicles.page.length > 0) {
      return filteredVehicles.page.map((vehicle, index) => {
        return (
          <div className='card' key={index}>
            <div className='row'>
              <div className='column'>
                <h2>
                  {capitalize(vehicle.make)} {vehicle.model}
                </h2>
                <div className='card-text'>Body type: {vehicle.bodyType}</div>
                <div className='card-text'>Tank: {vehicle.fuelType}</div>
                <div className='card-text'>
                  Engine capacity: {vehicle.engineCapacity}
                </div>
                <div className='card-text'>
                  Horse power: {vehicle.enginePowerPS}
                </div>
                <div className='card-text'>
                  Engine power KW: {vehicle.enginePowerKW}
                </div>
                <button
                  className='btn btn-block card-btn'
                  onClick={() => onSelectClick(vehicle)}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <>
      <div className='screen-container'>
        <div className='row'>{renderVehicleCards()}</div>
      </div>
      {renderActionButtons()}
      {serverError && (
        <Modal
          text={'Service unavailable. Please try again'}
          closeModal={setServerError}
        />
      )}
    </>
  );
};

export default Vehicles;
