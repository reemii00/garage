// controllers/userController.js

// ✅ Update the authenticated user's location
export const updateUserLocation = async (req, res) => {
  const userId = req.user._id;
  const { latitude, longitude } = req.body;

  // Check if both latitude and longitude are provided
  if (!latitude || !longitude) {
    return res.status(400).json({
      message: "Latitude and longitude are required.",
    });
  }

  try {
    // Update the user's location in the database
    const user = await User.findByIdAndUpdate(
      userId,
      { location: { latitude, longitude } },
      { new: true } // Return the updated document
    );

    // Send success response
    res.json({ message: "Location updated", user });
  } catch (error) {
    // Send error response
    res.status(500).json({ message: "Failed to update location" });
  }
};
