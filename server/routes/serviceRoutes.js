import express from "express";
import Service from "../models/serviceModel.js";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);


// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
});

// Create new service (Admin only)
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newService = await Service.create({ name, description, price });
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: "Failed to delete service", error: err.message });
  }
});

// Delete service by ID
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete service" });
  }
});

// Update service by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: "Failed to update service" });
  }
});


export default router;
