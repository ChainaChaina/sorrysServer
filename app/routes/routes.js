module.exports = app => {
    const sorry = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    // Create a new task
    router.post("/", sorry.create);
  
    // Retrieve all sorrys
    router.get("/", sorry.findAll);
  
    // Retrieve a single sorry with id
    router.get("/:id", sorry.findOne);
  
    // Update a sorry with id
    router.put("/:id", sorry.update);
  
    // Delete a sorry with id
    router.delete("/:id", sorry.delete);
  
    // Delete all sorrys
    router.delete("/", sorry.deleteAll);
  
    app.use("/api/sorrys", router);
  };