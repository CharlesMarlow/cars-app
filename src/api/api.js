import axios from 'axios';
let retry = 0;

export const getMakes = async (term) => {
  try {
    const response = await axios.get(
      `http://localhost:8081/api/v1/makes?term=${term}`
    );
    retry = 0;
    return response;
  } catch (err) {
    console.error('Error from getMakes endpoint', err);
    while (retry <= 3) {
      retry++;
      return getMakes(term);
    }
    return {
      err,
    };
  }
};

export const getModels = async (make) => {
  try {
    const response = await axios.get(
      `http://localhost:8081/api/v1/models?make=${make}`
    );
    retry = 0
    return response;
  } catch (err) {
    console.error('Error from getModels endpoint', err);
    while (retry <= 3) {
      retry++;
      return getModels(make);
    }
    return {
      err,
    };
  }
};

export const getVehicles = async (make, model, limit, offset) => {
  try {
    const response = await axios.get(
      `http://localhost:8081/api/v1/vehicles?make=${make}&model=${model}&limit=${limit}&offset=${offset}`
    );
    retry = 0;
    return response;
  } catch (err) {
    console.error('Error from getVehicles endpoint', err);
    while (retry <= 3) {
      retry++;
      return getVehicles(make, model, limit, offset);
    }
    return {
      err,
    };
  }
};
