let mongoose = require("mongoose");

let studentSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel", default: null },
    rollNo: { type: String, default: "null" }, // Corrected default value
    address: { type: String, default: "" },
    contact: { type: String, default: "" },
    course: { type: String, default: "" },
    image: { type: String, default: "no-pic.jpg" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("studentModel", studentSchema);
