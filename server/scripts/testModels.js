require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../src/db");

const User = require("../src/models/User");
const Workspace = require("../src/models/Workspace");

async function testModels() {
    let user;

    try {
        await connectDB();

        // Create a test user
        user = await User.create({
            name: "Test User",
            email: `test${Date.now()}@example.com`,
            passwordHash: "temporary-test-hash",
        });

        console.log("User created:", user._id);

        // Create a workspace belonging to that user
        const workspace = await Workspace.create({
            name: "Test Business",
            owner: user._id,
            allowedDomains: ["example.com"],
        });

        console.log("Workspace created:", workspace._id);

        // Verify the relationship using populate()
        const result = await Workspace.findById(workspace._id)
            .populate("owner", "name email");

        console.log("Workspace owner:", result.owner);

        console.log("\nBoth models are working correctly!");

        // Clean up test records
        await Workspace.deleteOne({ _id: workspace._id });
        await User.deleteOne({ _id: user._id });

        console.log("Test records cleaned up.");
    } catch (error) {
        console.error("Model test failed:", error.message);

        if (user) {
            await Workspace.deleteMany({ owner: user._id });
            await User.deleteOne({ _id: user._id });
        }
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

testModels();