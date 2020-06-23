module.exports = app => {
    const weathers = require("../controllers/weather.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Weatherdata
    router.post("/", weathers.create);
  
    // Retrieve all Weatherdatas
    router.get("/", weathers.findAll);
  
    // Retrieve a single Weatherdata with id
    router.get("/:id", weathers.findOne);
  
    // Update a Weatherdata with id
    router.put("/:id", weathers.update);
  
    // Delete a Weatherdata with id
    router.delete("/:id", weathers.delete);
  
    // Create a new Weatherdata
    router.delete("/", weathers.deleteAll);

    const base_url = '/api/weathers/'+process.env.API_KEY;
  
    app.use(base_url, router);
    app.use('prout/prout/', router);
  };