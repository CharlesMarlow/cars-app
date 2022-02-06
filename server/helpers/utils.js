const { default: axios } = require('axios');

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const getMakes = async () => {
  try {
    const makesApi = 'http://localhost:8080/api/makes';
    const response = await axios.get(makesApi, config);
    const { data } = response;
    return data;
  } catch (err) {
    console.error('Error from DB: [makes]', err);
  }
};

const getModels = async (make) => {
  try {
    const modelsApi = `http://localhost:8080/api/models?make=${make}`;
    const response = await axios.get(modelsApi, config);
    const { data } = response;
    return data;
  } catch (err) {
    console.error('Error from DB: [models]', err);
  }
};

const getVehicles = async (make, model) => {
  try {
    const vehiclesApi = `http://localhost:8080/api/vehicles?make=${make}&model=${model}`;
    const response = await axios.get(vehiclesApi, config);
    const { data } = response;
    return data;
  } catch (err) {
    console.error('Error from DB: [vehicles]', err);
  }
};

module.exports = {
  getMakes,
  getModels,
  getVehicles,
};
