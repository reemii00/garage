import Service from "../models/serviceModel.js";

// GET all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

// POST create a new service
export const createService = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newService = await Service.create({ name, description, price });
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: "Failed to create service" });
  }
};

// PUT update service by ID
export const updateService = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Service not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update service" });
  }
};

// DELETE service by ID
export const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Service not found" });

    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete service" });
  }
};
