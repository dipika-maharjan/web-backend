const Booking = require("../model/Booking");
const Customer = require("../model/Customer");
const Design = require("../model/Design");

// Get all bookings (Admin)
const findAll = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [
                { model: Customer, attributes: ["id", "full_name"] },
                { model: Design, attributes: ["id", "title"] }
            ]
        });

        res.status(200).json(bookings);
    } catch (err) {
        console.error("Error retrieving bookings:", err);
        res.status(500).json({ message: "Error retrieving bookings", error: err.message });
    }
};

// Get booking by ID (For Customer & Admin)
const findById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id, {
            include: [
                { model: Customer, attributes: ["id", "full_name"] },
                { model: Design, attributes: ["id", "title"] }
            ]
        });

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        res.status(200).json(booking);
    } catch (err) {
        console.error("Error retrieving booking:", err);
        res.status(500).json({ message: "Error retrieving booking", error: err.message });
    }
};

// Save a new booking (For Customer)
const save = async (req, res) => {
    try {
        const { customerId, designId, full_name, contact_number, email, room_name, design_name, date, description } = req.body;

        // Validate required fields
        if (!customerId || !designId || !full_name || !contact_number || !email || !room_name || !design_name || !date || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if customer and design exist
        const customer = await Customer.findByPk(customerId);
        const designData = await Design.findByPk(designId);

        if (!customer) return res.status(404).json({ message: "Customer not found" });
        if (!designData) return res.status(404).json({ message: "Design not found" });

        // Create new booking
        const newBooking = await Booking.create({
            customerId,
            designId,
            full_name,
            contact_number,
            email,
            room_name,
            design_name,
            date,
            description
        });

        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (err) {
        console.error("Booking creation error:", err);
        res.status(500).json({ message: "Error saving booking", error: err.message });
    }
};

// Update booking (Admin)
const update = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        // Validate customerId and designId if they are being updated
        if (req.body.customerId) {
            const customer = await Customer.findByPk(req.body.customerId);
            if (!customer) return res.status(404).json({ message: "Customer not found" });
        }
        if (req.body.designId) {
            const design = await Design.findByPk(req.body.designId);
            if (!design) return res.status(404).json({ message: "Design not found" });
        }

        await booking.update(req.body);
        res.status(200).json({ message: "Booking updated successfully", booking });
    } catch (err) {
        console.error("Booking update error:", err);
        res.status(500).json({ message: "Error updating booking", error: err.message });
    }
};

// Delete booking (Admin)
const deleteById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        await booking.destroy();
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (err) {
        console.error("Booking deletion error:", err);
        res.status(500).json({ message: "Error deleting booking", error: err.message });
    }
};

module.exports = { findAll, findById, save, update, deleteById };
