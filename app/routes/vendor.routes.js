module.exports = app => {
    const vendors = require("../controllers/vendor.controller.js");
  
    // Create a new Vendor
    app.post("/vendors", vendors.create);
  
    // Retrieve all Vendors
    app.get("/vendors", vendors.findAll);
  
    // Retrieve a single Vendor with vendorID
    app.get("/vendors/:vendorID", vendors.findOne);
  
    // Update a Vendor with vendorID
    app.put("/vendors/:vendorID", vendors.update);
  
    // Delete a Vendor with VendorID
    app.delete("/vendors/:vendorID", vendors.delete);
  
    // Create a new Customer
    app.delete("/vendors", vendors.deleteAll);
  };