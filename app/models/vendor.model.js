const vendorRoutes = require("../routes/vendor.routes.js");
const sql = require("./db.js");

// constructor
const Vendor = function(vendor) {
  this.url = vendor.url;
  this.vendorName = vendor.vendorName;
  this.latitude = vendor.latitude;
  this.longitude = vendor.longitude;
  this.addressID = vendor.addressID;
};

Vendor.create = (newVendor, result) => {
  newVendor.created_at = new Date();
  sql.query("INSERT INTO nbVendors SET ?", newVendor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created vendor: ", { id: res.insertId, ...newVendor });
    result(null, { id: res.insertId, ...newVendor });
  });
};

Vendor.findById = (vendorID, result) => {
  sql.query(`SELECT * FROM nbVendors WHERE VendorID = ${vendorID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found vendor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Vendor not found with the id
    result({ kind: "not_found" }, null);
  });
};

Vendor.getAll = result => {
  sql.query("SELECT * FROM nbVendors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vendors: ", res);
    result(null, res);
  });
};

Vendor.updateById = (id, vendor, result) => {
  vendor.updated_at = new Date();

/*  A loop to make some update parameters optional 
        requires an update to constructor so optional parameters
        do not get set to null - this can be reviewed later
        Will assume all parameters are required like create for now
  query = "UPDATE nbVendors SET";
  params =[];
  loop = 0;

  for (var key in vendor) {
    if (vendor.hasOwnProperty(key)) {
        console.log(key + " -> " + vendor[key]);
        if (loop == 0) {
          query = query+" "+key+" = ?"
          params[loop]=key;
        } else if (loop > 0) {
          query = query+", "+key+" = ?"
          params[loop]="vendor."+key;
        }
        loop++;
    }
  }
  query = query+" WHERE vendorID= ?";
  params[loop]="id";
  console.log(query);
  console.log(params);
*/

  sql.query(
    "UPDATE nbVendors SET vendorName = ?, url = ?, latitude = ?, longitude = ?, addressID = ?, updated_at = ? WHERE vendorID = ?",
    [vendor.vendorName, vendor.url, vendor.latitude, vendor.longitude, vendor.addressID, vendor.updated_at, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        //Vendor not found with that id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated vendor: ", { id: id, ...vendor });
      result(null, { id: id, ...vendor });
    }
  );
};

Vendor.remove = (id, result) => {
  sql.query("DELETE FROM nbVendors WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Vendor not found with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted vendor with id: ", id);
    result(null, res);
  });
};

Vendor.removeAll = result => {
  /*sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }*/

    console.log(`attempted full delete, deleted no vendors`);
    result(null, res);
  //});
};

module.exports = Vendor;