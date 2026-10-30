const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const workspaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        publicKey: {
            type: String,
            unique: true,
            default: randomUUID,
        },

        allowedDomains: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

workspaceSchema.index({ owner: 1 });

module.exports = mongoose.model("Workspace", workspaceSchema);