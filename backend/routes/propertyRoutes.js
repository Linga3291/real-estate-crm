
const express = require("express");
const Property = require("../models/Property");

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const property = new Property(req.body);
  await property.save();
  res.json(property);
});

// READ
router.get("/", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: "Property deleted" });
});

module.exports = router;
