const express = require('express');
const router = express.Router();
const { getMakes, getModels, getVehicles } = require('../helpers/utils');

// Communication with external service
router.get('/api/v1/makes', async (req, res) => {
  const makes = await getMakes();
  if (makes) {
    const { term } = req.query;
    const searchedMakes = makes.filter((make) =>
      make.startsWith(term.toUpperCase())
    );
    res.send(searchedMakes);
  } else {
    return res.status(500).send({
      message: 'Service Unavailable',
    });
  }
});

router.get('/api/v1/models', async (req, res) => {
  const { make } = req.query;
  const models = await getModels(make);
  if (models) {
    res.send(models);
  } else {
    return res.status(500).send({
      message: 'Service Unavailable',
    });
  }
});

router.get('/api/v1/vehicles', async (req, res) => {
  const { make, model, limit, offset } = req.query;
  const vehicles = await getVehicles(make, model);
  if (vehicles) {
    const searchedVehicles = vehicles.filter((vehicle) =>
      vehicle.model.startsWith(model)
    );
    res.send({
      total: searchedVehicles.length,
      page: searchedVehicles.slice(+offset * +limit, (+offset + 1) * +limit),
    });
  } else {
      return res.status(500).send({
        message: 'Service Unavailable',
      });
  }
});

module.exports = router;
