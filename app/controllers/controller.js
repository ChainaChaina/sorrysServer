const db = require("../models");
const sorry = db.sorry;

// Create and Save a new sorry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a sorry
  const sorry = new db.sorry({
    tag: req.body.tag,
    description: req.body.description,
    approved: req.body.published ? req.body.published : false
  });

  // Save sorry in the database
  sorry
    .save(sorry)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the sorry."
      });
    });
};

// Retrieve all sorrys from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  sorry.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sorrys."
      });
    });
};

// Find a single sorry with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  sorry.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found sorry with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving sorry with id=" + id });
    });
};

// Update a sorry by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  sorry.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update sorry with id=${id}. Maybe sorry was not found!`
        });
      } else res.send({ message: "sorry was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating sorry with id=" + id
      });
    });
};

// Delete a sorry with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  sorry.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete sorry with id=${id}. Maybe sorry was not found!`
        });
      } else {
        res.send({
          message: "sorry was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete sorry with id=" + id
      });
    });
};

// Delete all sorrys from the database.
exports.deleteAll = (req, res) => {
  sorry.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} sorrys were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sorrys."
      });
    });
};