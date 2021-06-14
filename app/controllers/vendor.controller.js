const Vendor = require("../models/vendor.model.js");

// Create and Save a new Vendor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Vendor
  const vendor = new Vendor({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    url: req.body.url,
    vendorName: req.body.vendorName,
    addressID: req.body.addressID
//    status: req.body.status
  });

  // Save Vendor in the database
  Vendor.create(vendor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vendor."
      });
    else res.send(data);
  });
};

// Retrieve all Vendors (in an area?) from the database.
exports.findAll = (req, res) => {
    Vendor.getAll((err, data) => {
        if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving vendors."
        });
        else res.send(data);
    });
};

// Find a single Vendor with a vendorId
exports.findOne = (req, res) => {
    Vendor.findById(req.params.vendorID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No Vendor with id ${req.params.vendorID} found.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Vendor with id " + req.params.vendorID
          });
        }
      } else res.send(data);
    });
};

// Update a Vendor identified by the VendorId in the request
exports.update = (req, res) => {
  // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Vendor.updateById( 
      req.params.vendorID,
      new Vendor(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No Vendor with id ${req.params.vendorID} found.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Vendor with id " + req.params.vendorID
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Vendor with the specified VendorId in the request
exports.delete = (req, res) => {
    Vendor.remove(req.params.vendorID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No Vendor with id ${req.params.vendorID} found.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Vendor with id " + req.params.vendorId
          });
        }
      } else res.send({ message: `Vendor was deleted successfully!` });
    });
};

// Delete all Vendors from the database.
exports.deleteAll = (req, res) => {
  res.send ({ message: 'Delete requires vendorID; cannot delete all vendors'});
};