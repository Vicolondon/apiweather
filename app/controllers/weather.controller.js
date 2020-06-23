const db = require("../models");
const WeatherData = db.weather_datas;

// Create and Save a new WeatherData
exports.create = (req, res) => {
    // Validate request
    if (!req.body.city) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a WeatherData
    const weather_data = new WeatherData({
        city: req.body.city,
        thermometerCelsius: req.body.thermometerCelsius,
        barometerPressure: req.body.barometerPressure,
        hygrometerHumidity: req.body.hygrometerHumidity,
    });
  
    // Save WeatherData in the database
    weather_data
      .save(weather_data)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the WeatherData."
        });
      });
  
};

// Retrieve all WeatherDatas from the database.
exports.findAll = (req, res) => {
    const city = req.query.city;
    var condition = city ? { city: { $regex: new RegExp(city), $options: "i" } } : {};
  
    WeatherData.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving weather datas."
        });
      });
  
};

// Find a single WeatherData with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    WeatherData.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found WeatherData with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving WeatherData with id=" + id });
      });
  
};

// Update a WeatherData by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    WeatherData.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update WeatherData with id=${id}. Maybe WeatherData was not found!`
          });
        } else res.send({ message: "WeatherData was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating WeatherData with id=" + id
        });
      });
  
};

// Delete a WeatherData with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

  WeatherData.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete WeatherData with id=${id}. Maybe WeatherData was not found!`
        });
      } else {
        res.send({
          message: "WeatherData was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete WeatherData with id=" + id
      });
    });
  
};

// Delete all WeatherDatas from the database.
exports.deleteAll = (req, res) => {
    WeatherData.deleteMany({})
      .then(data => {
        res.send({
            message: `${data.deletedCount} WeatherDatas were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all weather datas."
        });
      });
};
