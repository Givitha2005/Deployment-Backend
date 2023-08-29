const express = require("express");
const Employees = require("../models/employees.models");
const router = express.Router();

// GET

router.get("/employee", (req, res) => {
  try {
    Employees.find((err, data) => {
      if(err) {
        return res.status(400).send({message: "Error while retrieving employees data"});
      }
      return res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send({message: "Internal Server Error"});
  }
});

// GET Employee by Id
router.get("/employee/:id", (req, res) => {
  try {
    Employees.findOne({_id: req.params.id}, (err, data) => {
      if(err) {
        return res.status(400).send({message: "Error while retrieving employees data"});
      }
       res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send({message: "Internal Server Error"});
  }
});

// POST
router.post("/employee", (req, res) => {
  try{
    let employee = new Employees(req.body);
    employee.save((err, data) => {
      if(err) {
        return res.status(400).send({message: "Error while adding a new employee data"});
      }
      res.status(201).send({id: data._id, message: "employee has been added successfully."})
    })
  } catch(error) {
    res.status(500).send({message: "Internal Server Error"});

  }
});

// PUT
router.put("/employee/:id", (req, res) => { //using path parameter
  try {
    Employees.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, (err, data) => {
      if (err) {
        return res.status(400).send({message: "Error while updating an existing employee"})
      }
      res.status(201).send({employeeId: req.params.id, message: "Employee has been updated successfully"})
    })
  } catch(error) {
    res.status(500).send({message: "Internal Server Error"})
  }
});

// DELETE
router.delete("/employee/:id", (req, res) => {
  try {
    Employees.deleteOne({_id: req.params.id}, (err, data) => {
      if(err) {
        return res.status(400).send({message: "Error while deleting an employee"})
      }
      res.status(200).send({message: "Employee as been deleted successfully"})
    })
  } catch (error) {
    res.status(500).send({message: 'Internal Server Error'});
  }
});

module.exports = router;